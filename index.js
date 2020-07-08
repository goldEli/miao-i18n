const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const babel = require("@babel/core");
const md5 = require("md5");
const fs = require("fs").promises;

const createI18nDir = require("./createI18nDir");
const utils = require("./utils");
const config = require("./config");

createI18nDir();
const zh = require(config.zhDataPath)
const en = require(config.enDataPath)

/**
 * 在调用 this.callback 前，对 code 进行国际化处理
 * @param {string} code
 * @param {不知道是啥} map
 */

function i18nLoader(code, map) {
  // console.log(process);
  this.callback(null, handleCode(code), map);
}

/**
 * 处理代码字符串
 * @param {*} code
 */
function handleCode(code) {
  // 该文件代码是否忽略国际化
  if (isIgnore(code)) {
    return code;
  }

  // 代码转语法树
  const ast = codeToAst(code);

  // 处理语法树
  handleAst(ast);

  // 处理后的语法树转代码
  const newCode = astToCode(ast);

  return newCode;
}

/**
 * 如果代码中包含 i18nIgnore 关键字，则该文件忽略国际化
 * @param {*} code
 */
function isIgnore(code) {
  return code.includes("i18nIgnore");
}

/**
 * 将语法树转代码字符串
 * @param {*} ast
 */
function astToCode(ast) {
  const { code } = babel.transformFromAst(ast, null, {});
  return code;
}

/**
 * 遍历语法树，将中文替换成变量
 * @param {*} ast
 */
function handleAst(ast) {
  // 遍历语法树
  traverse(ast, {
    StringLiteral({ node }) {
      if (node) {
        const text = node.value;
        if (utils.isChineseChar(text)) {
          utils.log(text);
          createI18nData(text);
          stringLiteralToIdentifier(node, text);
        }
      }
    },
  });
}

async function createI18nData(text) {
  const key = md5(text);
  if (!(key in zh)) {
    zh[key] = text;
    en[key] = text;
    await fs.writeFile(config.zhDataPath, JSON.stringify(zh));
    await fs.writeFile(config.enDataPath, JSON.stringify(en));
  }
}

/**
 * 代码字符串转成语法树
 * @param {*} code
 */
function codeToAst(code) {
  const ast = parser.parse(code, {
    sourceType: "module", // 识别ES Module
    plugins: [
      "jsx", // enable jsx
      "classProperties",
      "dynamicImport",
      "optionalChaining",
      "decorators-legacy",
    ],
  });
  return ast;
}

/**
 * 字符串转为变量
 * @param {*} node
 * @param {*} text
 */
function stringLiteralToIdentifier(node, text) {
  const key = md5(text);
  const identifier = `window.$i18n["${key}"]`;

  // if (key in chineseSource) {
  delete node.extra;
  delete node.value;

  node.loc.identifierName = identifier;
  node.name = identifier;
  node.type = "Identifier";
  // } else {
  //   !isRepeat(key) && log(`"${key}": "${text}",`);
  // }
}

// export default i18nLoader
module.exports = i18nLoader;

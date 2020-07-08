const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const babel = require("@babel/core");
const md5 = require("md5");
const path = require("path");
const fs = require("fs");
const createI18nDir = require("./createI18nDir")

createI18nDir()


/**
 * 在调用 this.callback 前，对 code 进行国际化处理
 * @param {string} code
 * @param {不知道是啥} map
 */

function i18nLoader(code, map) {
  // console.log(process);
  // console.log(code);
  //   console.log("=====")
  this.callback(null, code, map);
}

// export default i18nLoader
module.exports = i18nLoader;

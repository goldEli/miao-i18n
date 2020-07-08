const fs = require("fs");
const c = require("./config");

const dirs = [c.i18nPath, c.zhPath, c.enPath];
const files = [
  { file: c.enDataPath, content: "{}" },
  { file: c.zhDataPath, content: "{}" },
  {
    file: c.i18nJsPath,
    content: `

const zh = require("./zh/data.json");
const en = require("./en/data.json");

module.exports = function (lang) {
  let data;
  switch (lang) {
    case "zh":
      data = zh;
      break;
    case "en":
      data = en;
      break;

    default:
      data = zh;
      break;
  }
  window.$i18n = data;
};
  `,
  },
];

function createFolder(dir) {
  if (fs.existsSync(dir)) return;

  fs.mkdirSync(dir);
  console.log("文件夹创建成功：", dir);
}

function createFile(file, content) {
  if (fs.existsSync(file)) return;
  fs.writeFileSync(file, content);
  console.log("文件创建成功：", file);
}

function main() {
  dirs.forEach((dir) => {
    createFolder(dir);
  });
  files.forEach((item) => {
    createFile(item.file, item.content);
  });
}

module.exports = main;

const c = require("./config");
const utils = require("./utils")

const dirs = [c.i18nPath, c.zhPath, c.enPath];
const files = [
  { file: c.enDataPath, content: "{}" },
  { file: c.zhDataPath, content: "{}" },
  {
    file: c.i18nJsPath,
    content: `
import zh  from "./zh/data.json"
import en  from "./en/data.json"

function i18n(lang) {
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

i18n("en")
  `,
  },
];


function main() {
  dirs.forEach((dir) => {
    utils.createFolder(dir);
  });
  files.forEach((item) => {
    utils.createFile(item.file, item.content);
  });
}

module.exports = main;

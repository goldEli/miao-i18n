const path = require("path");
const rootPath = process.cwd();
const srcPath = path.join(rootPath, "src");
const i18nPath = path.join(srcPath, "i18n");
const zhPath = path.join(i18nPath, "zh");
const enPath = path.join(i18nPath, "en");
const zhDataPath = path.join(zhPath, "data.json");
const enDataPath = path.join(enPath, "data.json");
const i18nJsPath = path.join(i18nPath, "i18n.js");
console.log("root path:", rootPath)
console.log("src path:", srcPath)
console.log("i18n path:", i18nPath)
module.exports = {
  rootPath,
  srcPath,
  i18nPath,
  zhPath,
  enPath,
  zhDataPath,
  enDataPath,
  i18nJsPath,
};

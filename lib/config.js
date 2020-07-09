const path = require("path");

const rootPath = process.env.ConEmuWorkDir + "";
const srcPath = path.join(rootPath, "src");
const i18nPath = path.join(srcPath, "i18n");
const zhPath = path.join(i18nPath, "zh");
const enPath = path.join(i18nPath, "en");
const zhDataPath = path.join(zhPath, "data.json");
const enDataPath = path.join(enPath, "data.json");
const i18nJsPath = path.join(i18nPath, "i18n.js");

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

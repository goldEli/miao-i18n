const fs = require('fs')

const md = {}
/**
 * 是否含有中文（也包含日文和韩文）
 * @param {*} str
 */
md.isChineseChar = (str) => {
  var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/
  return reg.test(str)
}
/**
 * log
 * @param {*} text
 */
md.log = (text) => {
  console.log("\x1b[33m%s\x1b[0m", text)
}
/**
 * 去重
 * @param {*} key
 */
var o = {}
md.isRepeat = (key) => {
  if (o[key]) {
    return true
  } else {
    o[key] = true
    return false
  }
}
md.createFolder = (dir) => {
  if (fs.existsSync(dir)) return;

  fs.mkdirSync(dir);
  console.log("文件夹创建成功：", dir);
}

md.createFile = (file, content) => {
  if (fs.existsSync(file)) return;
  fs.writeFileSync(file, content);
  console.log("文件创建成功：", file);
}

module.exports = md
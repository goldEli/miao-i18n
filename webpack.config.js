const path = require("path");
module.exports = {
  entry: "./index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "lib"),
  },
  target: 'node',
  node: {
    fs: "empty",
  }
};

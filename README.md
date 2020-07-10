# webpack i18n loader

国际化：自动管理工具

[![NPM version][npm-image]][npm-url] 

[npm-image]: https://img.shields.io/npm/v/miao-i18n.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/miao-i18n

### 背景

前段时间需要把一个开发了两年左右的项目进行国际化，支持中英文，逛了一圈社区都没有发现能很好解决痛点的轮子，比如：

* 维护资源文件太麻烦
* 代码侵入性太强，我不想把一个两年的项目，一个个文件去改

于是我决定自己写个工具：

* 资源文件自动生成，自动更新
* 代码0侵入，写代码时候完全不用去考虑国际化

总的来说就是，只要工具引入后，后期维护成本只有一个，只用考虑翻译资源文件。

### 思路

本质上就是实现一个 `webpack loader` ，在打包的时候自动处理国际化：

* 遍历所有代码，提取代码中的中文字符串，生成资源文件（资源文件key，通过对应中文的`MD5`加密生成）
* 将资源文件内容挂在到全局 `$i18n`对象上
* 遍历所有代码，将代码中的中文替换成 `$i18n[key]`

代码已放到 `Github`：[miao-i18n](https://github.com/goldEli/miao-i18n)

### 如何使用

以 `create-react-app` 为例，创建一个项目：

``` shell
create-react-app myapp
```

由于我们需要添加`webpack loader`所以需要将配置暴露出来：

```shell
yarn eject
```

安装 [miao-i18n](https://github.com/goldEli/miao-i18n)：

```shell
yarn add miao-i18n
```

配置 `webpack`, 打开 `myapp/config/webpackDevServer.config.js`，由于 `loader`是自下而上执行的，所有我们要把我们的loader配置到最上面，这个很重要。

```javascript
module: {
    strictExportPresence: true,
    rules: [
    // Disable require.ensure as it's not a standard language feature.
    { parser: { requireEnsure: false } },
+    {
+    test: /\.(js|mjs|jsx|ts|tsx)$/,
+    exclude: /node_module/,
+    loader: require.resolve("miao-i18n"),
+    },
...
}    
```

配置完成，可以开始愉快的玩耍了😊

```shell
yarn start	
```

项目启动后，可以看到 `src` 目录下自动生成了一个 `i18n`文件夹：

```
├─src
|  ├─i18n
|  |  ├─i18n.js
|  |  ├─zh
|  |  | └data.json
|  |  ├─en
|  |  | └data.json
```

`zh`、`en`分别对应中文和英文资源，这个就不用说了。

`i18n.js`用来引入和切换资源文件:

```javascript
import zh  from "./zh/data.json"
import en  from "./en/data.json"

/**
如果需要用按钮切换语言，可以将此方法暴露给按钮的点击回调。
*/
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


i18n("en")// 切换为英文
```

最后把`i18n.js`引入到项目中。打开 `src/index.js`，在项目最前面引入 `i18n.js`

```
+ import "./i18n/i18n"
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker'
...
```

配置完成！🍾🍾🍾

添加中文试试吧。

打开 `src/App.js`，修改代码如下

```
import React from 'react';
function App() {
  return (
    <div className="App">
      <p>前端</p>
      <p>后算</p>
      <p>算法</p>
    </div>
  );
}
export default App;
```

保存文件，查看浏览器：

![](https://user-gold-cdn.xitu.io/2020/7/10/17336fdd143ce816?w=180&h=110&f=png&s=1277)

此时，资源文件已经自动生成了，打开 `src/i18n/en/data.json` 或者 `src/i18n/zh/data.json` 查看：

```json
{
    "e6803e21b9c61f9ab3d04088638cecd2": "苹果",
    "b7c03bbf2b8bb334e1dfae5939d82d1b": "香蕉",
    "05b1b3102be250f2a6fadf800f8ad8b6": "葡萄"
}
```
我们把 `src/i18n/en/data.json` 翻译了

```json
{
-    "e6803e21b9c61f9ab3d04088638cecd2": "苹果",
-    "b7c03bbf2b8bb334e1dfae5939d82d1b": "香蕉",
-    "05b1b3102be250f2a6fadf800f8ad8b6": "葡萄"
+    "e6803e21b9c61f9ab3d04088638cecd2": "Apple",
+    "b7c03bbf2b8bb334e1dfae5939d82d1b": "banana",
+    "05b1b3102be250f2a6fadf800f8ad8b6": "grape"
}
```

保存代码，查看浏览器

![](https://user-gold-cdn.xitu.io/2020/7/10/1733707d47cc691f?w=180&h=113&f=png&s=1405)

页面显示为了英文，大功告成！🙂

### 最后

由于此工具目前只在我的项目中使用，所有肯定有很我没有考虑到的地方，欢迎各位大佬提建议和意见，`Github 地址`: [miao-i18n](https://github.com/goldEli/miao-i18n)

感谢阅读！🌹

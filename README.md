# rollup+babel+XMLHttpRequest打造网络请求库

详细的说明文章[详细文章地址](https://juejin.cn/post/7002794898302697503/)

**rollup.config.js**

```js
import commonjs from '@rollup/plugin-commonjs'; // 把commonjs模块转成是es6模块方式
import nodeResolve from '@rollup/plugin-node-resolve'; // rollup能够加载解析node_modules的第三方包
import babel from '@rollup/plugin-babel'; // 转换babel

export default {
    input: 'src/main.js', // 入口文件
    external: [], // 不需要rollup处理第三方包，作为外部依赖，例如：['lodash']
    output: {
        file: 'dist/bundle.js', // 打包输出文件位置
        format: 'umd', // 打包输出文件模块方式(amd | cjs | es | iife | umd | system)
        globals: {}, // 一般配合external一起使用，例如 {lodash: '_'}
        name: 'axiosmini', // 如果format是iife/umd，这个字段是必填的。浏览器条件下，相当于在window上扩展了这个名字作为这个库的全局对象。
        sourcemap: true,  // 生成sourcemap文件
    },

    plugins: [
        nodeResolve(), // 能够加载项目node_modules中的第三方包
        commonjs(), // 把commonjs的模块方式转化成import/export（rollup默认支持es的模块导入导出）
        babel({
            babelHelpers: 'runtime', // 
            exclude: 'node_modules/**' // 排除掉node_modules的第三方库
        }),
        
    ]
}
```



**babel.config.js**

```js
module.exports = {
    "presets": [
        [
            "@babel/env"
        ]
    ],
    "plugins": [
        "@babel/plugin-transform-runtime"
    ]
}
```


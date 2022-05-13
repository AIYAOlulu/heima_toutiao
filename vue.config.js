const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // 把打包之后李静从网络绝对路径变成相对路径
  publicPath: './',
  transpileDependencies: true
})

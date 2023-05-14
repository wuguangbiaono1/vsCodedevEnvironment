
const webpack = require('webpack')

module.exports = {
  lintOnSave: false,
  publicPath: "/",
  devServer: {
    host: "0.0.0.0",
    disableHostCheck: true, // webpack4.0 开启热更新
    proxy: {
      "/": {
        target: "http://127.0.0.1:12501/",
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/": "/"
        }
      }
    }
    // before: app => {}
  },

    chainWebpack: config => {
      config.plugin('provide').use(webpack.ProvidePlugin, [{
        $: 'jquery',
        jquery: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      }])
    }

}

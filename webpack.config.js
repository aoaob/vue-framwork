// 公共模块
const path = require('path')
const webpack = require('webpack')

// 资源文件文件夹
const assets = 'Viewts-yiban-style/'
// 资源文件文件夹
const pageAssets = 'Views-yiban-Template/yiban/'
// 生成进度条
const WebpackBar = require('webpackbar')
// 清除目录等
const cleanWebpackPlugin = require('clean-webpack-plugin')
// 分离css
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractCss = new ExtractTextPlugin(assets + 'css/[name].css')
// css3 自动补全
const autoprefixer = require('autoprefixer')
// 静态资源输出
const copyWebpackPlugin = require('copy-webpack-plugin')
// html模板
const htmlWebpackPlugin = require('html-webpack-plugin')
const getHtmlConfig = function (path, name, title) {
  return {
    template: path + name + '.html',
    filename: 'view' + name + '/' + name + '.html',
    title: title,
    inject: true,
    hash: true,
    chunks: ['vendor', name],
    favicon: './src/favicon.ico'
  }
}

module.exports = {
  context: path.resolve(__dirname),
  // devtool: 'source-map',
  entry: {
    'vendor': [
      'jquery', 'lodash', 'axios', './src/js/TimeAgo.js', './src/js/common.js',
      'bootstrap/dist/css/bootstrap.min.css', './src/css/font-awesome.min.css', './src/css/reset.less', 'swiper/dist/css/swiper.min.css', './src/css/main.less'
    ],
    'bootstrap': 'bootstrap/dist/js/bootstrap.min.js',
    'index': './src/js/index.js',
    'info': './src/js/info.js'
  },
  output: {
    filename: assets + 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    chunkFilename: '[id].chunk.js'
  },
  // 代码模块路径解析的配置
  resolve: {
    modules: [
      'node_modules' //, path.resolve(__dirname, 'src')
    ],
    // 定义引用路径别名 配置别名可以加快webpack查找模块的速度
    alias: {
      // 'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve('src')
    },
    // 定义模块查找的后缀，方便在代码引用时可省略后缀
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.vue']
  },
  module: {
    // noParse(content) {
    //   if (/jquery|lodash|axios/.test(content)) {
    //     console.log("---------------" + content)
    //   }
    //   return /jquery|lodash|axios/.test(content)
    // },
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
          // the "scss" and "sass" values for the lang attribute to the right configs here.
          // other preprocessors should work out of the box, no loader config like this nessessary.
          // 'scss': 'vue-style-loader!css-loader!sass-loader',
          // 'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
          // 'less': 'vue-style-loader!css-loader!less-loader',
          'less': extractCss.extract({
            fallback: 'vue-style-loader',
            use: [{
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            {
              loader: 'less-loader'
            }
            ]
          })
        }
        // other vue-loader options go here
      }
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      },
      exclude: /node_modules/
    },
    {
      test: /\.css$/,
      // 此处为使用postcss分离css的写法
      loaders: extractCss.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            minimize: true
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: [autoprefixer({
              browsers: ['last 2 versions']
            })]
          }
        }
        ]
      })
    },
    {
      test: /\.less$/,
      loaders: extractCss.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            minimize: true
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: [autoprefixer({
              browsers: ['last 2 versions']
            })]
          }
        },
        {
          loader: 'less-loader'
        }
        ]
      })
    },
    {
      test: /\.(woff2?|svg|ttf|eot)$/,
      loader: {
        loader: 'url-loader',
        options: {
          limit: 8196,
          name: assets + 'fonts/[name].[ext]?[hash:8]'
        }
      }
    },
    {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        limit: 8196,
        name: assets + 'images/[name].[ext]?[hash:8]'
      }
    }
    ]
  },
  plugins: [
    new WebpackBar(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.SplitChunksPlugin({
      chunks: 'all',
      minSize: 20000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true
    }),
    // 调用之前先清除
    new cleanWebpackPlugin(['dist'], {
      root: process.cwd(), // 根目录
      verbose: true, // 开启在控制台输出信息
      dry: false // 启用删除文件
    }),
    new copyWebpackPlugin([{
      from: path.resolve(process.cwd(), 'src/nosupport'),
      to: assets + '/nosupport'
    }]),
    extractCss,
    // 定义全局函数
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      axios: 'axios'
    }),
    // 自动生成html模板
    new htmlWebpackPlugin({
      filename: pageAssets + 'index.cshtml',
      title: 'yibanIndexViewModel',
      chunks: ['vendor', 'index', 'bootstrap'], // 按需引入对应名字的js文件
      template: './src/main.html',
      hash: true,
      inject: false,
      favicon: './src/favicon.ico',
      minify: { // 配置html的压缩
        removeComments: true, // 设置去除注释
        collapseWhitespace: false // 设置去除空格
      }
    }),
    new htmlWebpackPlugin({
      filename: pageAssets + 'info.cshtml',
      title: 'yibanInfoViewModel',
      chunks: ['vendor', 'info', 'bootstrap'], // 按需引入对应名字的js文件
      template: './src/main.html',
      hash: true,
      inject: false,
      favicon: './src/favicon.ico',
      minify: { // 配置html的压缩
        removeComments: true, // 设置去除注释
        collapseWhitespace: false // 设置去除空格
      }
    }),
    new htmlWebpackPlugin({
      filename: 'index.html',
      title: '首页测试',
      chunks: ['vendor', 'index', 'bootstrap'], // 按需引入对应名字的js文件
      template: './src/index.html',
      hash: true,
      inject: false,
      favicon: './src/favicon.ico',
      minify: { // 配置html的压缩
        removeComments: true, // 设置去除注释
        collapseWhitespace: false // 设置去除空格
      }
    })
  ],
  devServer: {
    host: 'localhost',
    port: '8089',
    inline: true,
    proxy: [{
      path: '/yiban/*',
      changeOrigin: true,
      target: 'http://passport.stuln.com/',
      host: 'passport.stuln.com'
    }]
  }
}

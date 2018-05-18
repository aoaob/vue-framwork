//公共模块
const path = require('path')
const webpack = require('webpack');

//资源文件文件夹
const TemplateStyle = "TemplateStyle/";
// 生成进度条
const WebpackBar = require('webpackbar');
// 清除目录等
const cleanWebpackPlugin = require("clean-webpack-plugin");
// 分离css
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCss = new ExtractTextPlugin(TemplateStyle + 'css/[name].css');
//css3 自动补全
const autoprefixer = require('autoprefixer');
//静态资源输出
const copyWebpackPlugin = require("copy-webpack-plugin");
// html模板
const htmlWebpackPlugin = require("html-webpack-plugin");
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
      'jquery', 'bootstrap/dist/js/bootstrap.min.js', 'lodash', 'axios',
      'bootstrap/dist/css/bootstrap.min.css', './src/css/base.less','./src/css/typo.less'],
      'index': './src/index.js',
    },
  output: {
    filename: TemplateStyle + 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  // 代码模块路径解析的配置
  resolve: {
    modules: [
      "node_modules" //,path.resolve(__dirname, 'src')
    ],
    // 定义引用路径别名 配置别名可以加快webpack查找模块的速度
    alias: {
      // 'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve('src'),
    },
    // 定义模块查找的后缀，方便在代码引用时可省略后缀
    extensions: [".wasm", ".mjs", ".js", ".json", ".jsx"],
  },
  module: {
    // noParse(content) {
    //   if (/jquery|lodash|axios/.test(content)) {
    //     console.log("---------------" + content)
    //   }
    //   return /jquery|lodash|axios/.test(content)
    // },
    rules: [
      {
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
            // {
            //   loader: 'postcss-loader',
            //   options: {
            //     ident: 'postcss',
            //     plugins: [autoprefixer({
            //       browsers: ['last 2 versions']
            //     })]
            //   }
            // },
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
        fallback: "style-loader",
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
        ],
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
          name: TemplateStyle + 'fonts/[name].[ext]?[hash:8]'
        }
      }
    },
    ]
  },
  plugins: [
    new WebpackBar(),
    new webpack.HotModuleReplacementPlugin(),
    // 调用之前先清除
    new cleanWebpackPlugin(["dist"], {
      root: process.cwd(), //根目录
      verbose: true, //开启在控制台输出信息
      dry: false //启用删除文件
    }),
    new copyWebpackPlugin([{
    	from: path.resolve(process.cwd(), 'src/nosupport'),
    	to: 'TemplateStyle/nosupport'
    }]),
    extractCss,
    //定义全局函数
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      axios: "axios"
    }),
    // 自动生成html模板
    /*
    'index':'./src/index.js',
    '01main': "./src/js/01/main.js"
    */
    new htmlWebpackPlugin({
      filename: "index.html",
      title: "首页",
      chunks: ['vendor','indexdemo', 'index'], // 按需引入对应名字的js文件
      template: "./src/index.html",
      hash: true,
      inject: true,
      favicon: './src/favicon.ico'
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all", // 必须三选一：'initial' | 'all' | 'async'
      minSize: 0,
      minChunks: 1,
      maxAsyncRequests: 1,
      maxInitialRequests: 1,
      name: () => { },
      cacheGroups: {
        // vendor: {
        // 	chunks: 'all',
        // 	test: /node_modules/,      // 正则规则验证，如果符合就提取chunks
        // 	name: "vendor"            // 要缓存的分割出来的chunk名称
        // },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
        // default: {
        // 	chunks: 'all',
        // 	name: 'commons',
        // 	reuseExistingChunks: true
        // }
      }
    }
  },
  devServer: {
    host: "localhost",
    port: '8088',
    inline: true,
  }
};
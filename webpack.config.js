const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const loader = require('sass-loader');
const webpack = require('webpack');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test'){
    require('dotenv').config({path: '.env.test'})
}else if (process.env.NODE_ENV = 'development'){
    require('dotenv').config({path: '.env.development'})
}

module.exports = (env) => {
    const isProduction = env === 'production';
    
    
    console.log('*****env', env)
    return {
        entry: './src/app.js',
        output: {
            path:path.join(__dirname,'public','dist'),
            filename:'bundle.js'
        },
        mode: 'none',
        module: {
            rules:[{
                loader: 'babel-loader',
                test:/\.js$/,
                exclude: /node_modules/
            },
        {
            test:/\.s?css$/,
//            use:['style-loader', 'css-loader', 'sass-loader']
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        }]
        },
        plugins:[
            new MiniCssExtractPlugin({filename: 'styles.css'}),
            new webpack.DefinePlugin({
                'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
                'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
                'process.env.FIREBASE_APPID': JSON.stringify(process.env.FIREBASE_APPID),
                'process.env.FIREBASE_MEASUREMENT_ID': JSON.stringify(process.env.FIREBASE_MEASUREMENT_ID)
            })
        ],
        devtool: isProduction ? 'source-map':'cheap-module-eval-source-map',
        devServer: {
            contentBase: path.join(__dirname,'public'),
            historyApiFallback: true,
            publicPath: '/dist/'
        }
    }
}
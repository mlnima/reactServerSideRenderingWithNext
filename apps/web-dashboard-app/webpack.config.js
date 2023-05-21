const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    // module: {
    //     rules: [
    //         {
    //             tests: /\.jsx?$/,
    //             exclude: /node_modules/,
    //             loader: 'babel-loader',
    //         },
    //         //other rules
    //     ],
    // },
    resolve: {
        //@ts-ignore
        plugins: [new TsconfigPathsPlugin()],
    }
}
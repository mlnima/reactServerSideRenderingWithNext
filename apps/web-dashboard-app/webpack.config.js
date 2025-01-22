const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                        plugins: ['react-refresh/babel'],
                    },
                },
            },
        ],
    },
    resolve: {
        //@ts-ignore
        plugins: [new TsconfigPathsPlugin(),new ReactRefreshWebpackPlugin()],
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
    }
}
// module.exports = {
//     module: {
//         rules: [
//             {
//                 test: /\.tsx?$/,
//                 use: 'ts-loader',
//                 exclude: /node_modules/,
//             },
//         ],
//     },
//     resolve: {
//         //@ts-ignore
//         plugins: [new TsconfigPathsPlugin()],
//     }
// }
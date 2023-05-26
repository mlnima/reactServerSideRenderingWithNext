const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        //@ts-ignore
        plugins: [new TsconfigPathsPlugin()],
    }
}
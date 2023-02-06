const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    //other rules
    resolve: {
        //@ts-ignore
        plugins: [new TsconfigPathsPlugin()],
    }
}
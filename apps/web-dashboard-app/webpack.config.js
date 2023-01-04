const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
console.log('rrrrrrrrrrrrrrrrrrrrrrrrrr')
module.exports = {
    //other rules
    resolve: {
        plugins: [new TsconfigPathsPlugin()],
    }
}
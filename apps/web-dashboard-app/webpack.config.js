const webpack = require('webpack'); // only add this if you don't have yet
import dotenv from 'dotenv'
require('dotenv').config({ path: '../../.env' });
import { DefinePlugin } from 'webpack'

module.exports = {
    plugins: [
        new DefinePlugin({
            'process.env': JSON.stringify(dotenv.config().parsed)
        })
    ]
}
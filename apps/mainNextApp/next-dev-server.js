require('module-alias/register')
require('dotenv').config({path: '../../.env'}); // require dotenv
const cli = require('next/dist/cli/next-dev');

//https://nextjs.org/blog/next-13#introducing-turbopack-alpha
// , '--turbo'
cli.nextDev(['-p', process.env.PORT || 3000]);
require('module-alias/register')
require('dotenv').config({path: '../../.env'});
const cli = require('next/dist/cli/next-dev');

//https://nextjs.org/blog/next-13#introducing-turbopack-alpha
// , '--turbo'
cli.nextDev(['-p', process.env.WEB_APPLICATION_PORT || 3000]);
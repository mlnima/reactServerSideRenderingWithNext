require('module-alias/register')
require('dotenv').config({path: '../../.env'}); // require dotenv
const cli = require('next/dist/cli/next-start');
cli.nextStart(['-p', process.env.WEB_APPLICATION_PORT || 3000]);
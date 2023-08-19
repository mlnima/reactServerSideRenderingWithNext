require('module-alias/register')
require('dotenv').config({path: '../../.env'}); // require dotenv
const cli = require('next/dist/cli/next-start');

console.log('*******************process.env.PORT=> ',process.env.PORT)

cli.nextStart(['-p', process.env.PORT || 3000]);
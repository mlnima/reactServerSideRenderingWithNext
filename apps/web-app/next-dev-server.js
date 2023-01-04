require('module-alias/register')
require('dotenv').config({path: '../../.env'}); // require dotenv
const cli = require('next/dist/cli/next-dev');
// const spawnSync = require("child_process").spawnSync;


// const MY_PREFIX = /^REACT_APP_/i;
//
//  Object.keys(process.env)
//     .filter(key => MY_PREFIX.test(key))
//      .forEach((env)=>{
//          const craKey = key.replace(MY_PREFIX, "REACT_APP_");
//          process.env[craKey] = process.env[env]
//  })
    // .reduce((env, key) => {
    //     const craKey = key.replace(MY_PREFIX, "REACT_APP_");
    //     env[craKey] = process.env[key];
    //     return env;
    // }, {});

// spawnSync("npm", ["run", "build"], {
//     shell: true,
//     stdio: [0, 1, 2],
//     env: transformedEnv
// });










//https://nextjs.org/blog/next-13#introducing-turbopack-alpha
// , '--turbo'
cli.nextDev(['-p', process.env.PORT || 3000]);
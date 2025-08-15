const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
// require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: './.env' });

const args = process.argv.slice(2);

const isDev = args && args.includes('-d');

const appsToRun = process.env.APPS_TO_RUN;

console.log(`isDev=> `, isDev);

const apps = appsToRun
  ? appsToRun
      .split(',')
      .map((app) => app.trim())
      .filter(Boolean)
  : [];

const filters = apps.length > 0 ? apps.map((app) => `--filter=${app}`).join(' ') : '';

const command = `turbo run start ${filters}`;

console.log('Running:', command);

// exec(command, (err, stdout, stderr) => {
//   if (err) {
//     console.error(stderr);
//     process.exit(1);
//   }
//   console.log(stdout);
// });

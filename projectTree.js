/* prettier-ignore */
const fs = require('fs');
const path = require('path');
const { minimatch } = require('minimatch');

// function buildMatchers(patterns) {
//   return patterns.map((pattern) => {
//     if (pattern.startsWith('*.')) {
//       const ext = pattern.slice(1); // like ".xml"
//       return (name) => name.toLowerCase().endsWith(ext.toLowerCase());
//     } else if (pattern.includes('.')) {
//       return (name) => name.toLowerCase() === pattern.toLowerCase();
//     } else {
//       return (name) => name.toLowerCase().includes(pattern.toLowerCase());
//     }
//   });
// }
//
// function generateTree(dir, excludePatterns = [], prefix = '') {
//   const matchers = buildMatchers(excludePatterns);
//
//   const items = fs.readdirSync(dir, { withFileTypes: true });
//
//   const filteredItems = items.filter((item) => !matchers.some((fn) => fn(item.name)));
//
//   filteredItems.forEach((item, index) => {
//     const isLast = index === filteredItems.length - 1;
//     const pointer = isLast ? '└── ' : '├── ';
//     console.log(prefix + pointer + item.name);
//
//     if (item.isDirectory()) {
//       const newPrefix = prefix + (isLast ? '    ' : '│   ');
//       generateTree(path.join(dir, item.name), excludePatterns, newPrefix);
//     }
//   });
// }

function generateTree(dir, excludePatterns = [], prefix = '', root = dir) {
  const items = fs.readdirSync(dir, { withFileTypes: true });

  const filteredItems = items.filter((item) => {
    const fullPath = path.join(dir, item.name);
    const relPath = path.relative(root, fullPath).replace(/\\/g, '/');
    return !excludePatterns.some((pattern) => minimatch(relPath, pattern, { matchBase: true }));
  });

  filteredItems.forEach((item, index) => {
    const isLast = index === filteredItems.length - 1;
    const pointer = isLast ? '└── ' : '├── ';
    console.log(prefix + pointer + item.name);

    if (item.isDirectory()) {
      const newPrefix = prefix + (isLast ? '    ' : '│   ');
      generateTree(path.join(dir, item.name), excludePatterns, newPrefix, root);
    }
  });
}

// Usage:
const excludeList = [
  'node_modules',
  '.git',
  '.turbo',
  'trash',
  'tempFiles',
  'ssl',
  'dist',
  'packages',
  '.swc',
  '.idea',
  'information',
  '.gitignore',
  '.prettierrc',
  '2021',
  '2022',
  '2023',
  '2024',
  '2025',
  '.next',
  '.webp',
  '*.zip',
  '*.xml',
  '*.svg',
  '*.png',
  '*.jpg',
  '*.mp4',
  'temp',
  'workers',
  'appearance',
  'assets',
  '.psd',
  'dictionaries',
  'default',
  '**/controllers/*',
  '**/middlewares/*',
  '**/uploads/*',
  '**/schemas/*',
  '**/util/*',
  '**/store/*',
  '**/__variables/*',
  'fonts',
  'admin',
  'api',
  'certificates',
  '**/components/**',
  '**/lib/**',
];
generateTree(process.cwd(), excludeList);

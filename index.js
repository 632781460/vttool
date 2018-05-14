#!/usr/bin/env node

const program = require('commander');
const path = require('path');
const pkgPath = path.join(__dirname, 'package.json');
const pkg = require(pkgPath);
program.version(pkg.version)
  .command('tag <tag>', '生成标签')
  .parse(process.argv);

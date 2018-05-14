'use strict';

const nodegit = require('nodegit');
const program = require('commander');
const moment = require('moment');
let tag = '';
function getTag(name) {
  const now = new Date();
  return `${moment(now).format('vYYYYMMDDHHmm')}-${name}`;
}
program
  .option('-a, --auto', '是否自动推送')
  .option('-u, --upstream [remote]', '指定远端upstream')
  .action(argTag => {
    tag = argTag;
  })
  .parse(process.argv);

const upstream = program.upstream || 'origin';

nodegit.Repository.open(process.cwd())
  .then(repo => {
    return nodegit.Tag.createLightweight(repo, getTag(tag));
  }).then(oid => {
    console.log(oid.tostrS);
  });

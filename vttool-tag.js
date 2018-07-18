const gitP = require('simple-git/promise');
const git = gitP(process.cwd());
const program = require('commander');
const moment = require('moment');
const co = require('co');
let tagName = '';
function getTag(name) {
  const now = new Date();
  const suffixName = name ? `-${name}` : '';
  return `${moment(now).format('vYYYYMMDDHHmm')}${suffixName}`;
}
program
  .option('-a, --auto', '是否自动推送')
  .option('-u, --upstream [remote]', '指定远端upstream')
  .action(argTag => {
    tagName = argTag;
  })
  .parse(process.argv);

const upstream = program.upstream || 'origin';

co(function * tagFn() {
  const vTag = getTag(tagName);
  yield git.addTag(vTag);
  if (program.auto) {
    yield git.push([upstream, vTag]);
  }
});

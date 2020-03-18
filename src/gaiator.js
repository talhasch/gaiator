import fs from 'fs';
import minimist from 'minimist';
import blockStack from 'blockstack';
import packJson from '../package';

import {gaiaAuth} from './auth';

const help = () => {
  console.error(`
  Usage:
  
  gaiator --pk APPPRIVATEKEY --if /path/to/input/file.json --of /path/to/output/file.json
  
  `);
};


export default async () => {
  const argv = minimist(process.argv.slice(2));

  if (argv._[0] === 'version') {
    console.log('gaiator v' + packJson.version);
    return
  }

  if (!argv.pk || !argv.if || !argv.of) {
    help();
    return;
  }

  const appPrivateKey = argv.pk;
  const inputFile = argv.if;
  const outputFile = argv.of;

  try {
    fs.writeFileSync(outputFile, '[]');
  } catch (e) {
    console.error('Specify a correct output file path!');
    process.exit(1);
  }

  let listRaw;
  try {
    listRaw = fs.readFileSync(inputFile, 'utf8');
  } catch (e) {
    console.error('Specify a correct input file path!');
    process.exit(1);
  }

  const tasks = JSON.parse(listRaw);

  try {
    await gaiaAuth(appPrivateKey);
  } catch (e) {
    console.error('Could not login! Make sure the private key is correct!');
    process.exit(1);
  }

  const rv = {};
  for (const task of tasks) {
    if (task.action === 'put') {
      const {name, path, encrypt, sign} = task;
      const data = fs.readFileSync(path);
      let resp;

      try {
        resp = await blockStack.putFile(name, data, {encrypt, sign});
        rv[name] = resp;
      } catch (e) {
        rv[name] = false;
      }
    }

    if (task.action === 'del') {
      const {name, wasSigned} = task;
      let resp;

      try {
        resp = await blockStack.deleteFile(name, {wasSigned});
        rv[name] = true;
      } catch (e) {
        rv[name] = false;
      }
    }
  }

  fs.writeFileSync(outputFile, JSON.stringify(rv));
};

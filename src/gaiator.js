import fs from 'fs';
import minimist from 'minimist';
import blockStack from 'blockstack';
import packJson from '../package';

import {gaiaAuth} from './auth';

const help = () => {
  console.error(`
  Usage:
  
  gaiator --pk APPPRIVATEKEY --of /path/to/order/file.json --op /path/top/output.json
  
  `);
};


export default async () => {
  const argv = minimist(process.argv.slice(2));

  if (argv._[0] === 'version') {
    console.log('gaiator v' + packJson.version);
    return
  }

  if (!argv.pk || !argv.of || !argv.op) {
    help();
    return;
  }

  const appPrivateKey = argv.pk;
  const orderFile = argv.of;
  const outPath = argv.op;

  try {
    fs.writeFileSync(outPath, '[]')
  } catch (e) {
    console.error('Specify a correct output file path!');
    process.exit(1);
  }

  let listRaw;
  try {
    listRaw = fs.readFileSync(orderFile, 'utf8');
  } catch (e) {
    console.error('Specify a correct order file path!');
    process.exit(1);
  }

  const orderList = JSON.parse(listRaw);

  try {
    await gaiaAuth(appPrivateKey);
  } catch (e) {
    console.error('Could not login! Make sure the private key is correct!');
    process.exit(1);
  }

  const rv = [];

  for (const order of orderList) {
    if (order.action === 'put') {
      const {id, path, name, encrypt, sign} = order;
      const data = fs.readFileSync(path);
      let resp;

      try {
        resp = await blockStack.putFile(name, data, {encrypt, sign});
        rv.push({id, rv: resp});
      } catch (e) {
        rv.push({id, rv: false});
      }
    }

    if (order.action === 'del') {
      const {id, name, wasSigned} = order;
      let resp;

      try {
        resp = await blockStack.deleteFile(name, {wasSigned});
        rv.push({id, rv: true});
      } catch (e) {
        rv.push({id, rv: false});
      }
    }
  }

  fs.writeFileSync(outPath, JSON.stringify(rv));
};

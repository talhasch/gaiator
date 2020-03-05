import fs from 'fs';
import minimist from 'minimist';
import blockStack from 'blockstack';

import {gaiaAuth} from './auth';

const help = () => {
  console.error(`
  Usage:
  
  gaiator --pk APPPRIVATEKEY --of /path/to/order/file.json 
  
  `);
};


export default async () => {
  const argv = minimist(process.argv.slice(2));

  if (!argv.pk || !argv.of) {
    help();
    return;
  }

  const appPrivateKey = argv.pk;
  const orderFile = argv.of;

  let listRaw;
  try {
    listRaw = fs.readFileSync(orderFile, 'utf8');
  } catch (e) {
    console.clear();
    console.error('Specify a correct order file path!');
    process.exit(1);
  }

  const orderList = JSON.parse(listRaw);

  try {
    await gaiaAuth(appPrivateKey);
  } catch (e) {
    console.clear();
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
  console.clear();
  console.log(JSON.stringify(rv))
};

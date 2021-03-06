import fs from 'fs';
import minimist from 'minimist';
import blockStack, {getPublicKeyFromPrivate, publicKeyToAddress} from 'blockstack';
import {arrayChunk} from './util';
import packJson from '../package';

import {gaiaAuth} from './auth';

const help = () => {
  console.error(`
  Usage:
  
  gaiator --if /path/to/input/file.json --of /path/to/output/file.json --cc 2 
  
  `);
};


export default async () => {

  const argvOpts = {
    default: {cc: 2}
  };

  const argv = minimist(process.argv.slice(2), argvOpts);

  if (argv._[0] === 'version') {
    console.log('gaiator v' + packJson.version);
    return
  }

  if (!argv.if || !argv.of) {
    help();
    return;
  }

  const inputFile = argv.if;
  const outputFile = argv.of;

  try {
    fs.writeFileSync(outputFile, '[]');
  } catch (e) {
    console.error('Specify a correct output file path!');
    process.exit(1);
  }

  let input;
  try {
    input = fs.readFileSync(inputFile, 'utf8');
  } catch (e) {
    console.error('Specify a correct input file path!');
    process.exit(1);
  }

  const inputObj = JSON.parse(input);
  const {privateKey, tasks} = inputObj;

  try {
    await gaiaAuth(privateKey);
  } catch (e) {
    console.error('Could not login! Make sure the private key is correct!');
    process.exit(1);
  }

  const doTask = async (task) => {
    if (task.action === 'put') {
      const {name, path, encrypt, sign, contentType} = task;
      const data = fs.readFileSync(path);

      try {
        const url = await blockStack.putFile(name, data, {encrypt, sign, contentType});
        return [name, url];
      } catch (e) {
        return [name, false];
      }
    }

    if (task.action === 'del') {
      const {name, wasSigned} = task;

      try {
        await blockStack.deleteFile(name, {wasSigned});
        return [name, true];
      } catch (e) {
        return [name, false];
      }
    }
  };

  const result = {};
  const chunks = arrayChunk(tasks, argv.cc);
  for (let chunk of chunks) {
    const ps = chunk.map(x => doTask(x));
    const cRes = await Promise.all(ps);
    for (let cR of cRes) {
      const [name, res] = cR;
      result[name] = res;
    }
  }

  const publicKey = getPublicKeyFromPrivate(privateKey);
  const address = publicKeyToAddress(publicKey);

  const out = {
    publicKey,
    address,
    result
  };

  fs.writeFileSync(outputFile, JSON.stringify(out));
};

import 'regenerator-runtime/runtime';

import gaiator from './gaiator';

// localStorage support for blockstack.js
const localStorageRAM = {};

global['window'] = {
  location: {
    origin: 'localhost'
  },
  localStorage: {
    getItem: function (itemName) {
      return localStorageRAM[itemName];
    },
    setItem: function (itemName, itemValue) {
      localStorageRAM[itemName] = itemValue;
    },
    removeItem: function (itemName) {
      delete localStorageRAM[itemName];
    }
  }
};
global['localStorage'] = global['window'].localStorage;

gaiator();

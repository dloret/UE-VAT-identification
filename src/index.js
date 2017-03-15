// API: https://euvat.ga/: https://euvat.ga/api/info/VATNUMBER
const platform = require('os').platform;

import vatList from './assets/vat.txt';

const myOs = platform(); // store the process.platform value as webpack somewhat gets rid of it if it's not (-> undefined)
const endOfLine = platform() === myOs ? '\r\n' : '\n'; // determines the characters used to terminate a line, per OS

const vat = vatList.split(endOfLine);
console.log(myOs, ' - ', endOfLine);
console.log(vat);

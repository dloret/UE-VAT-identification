// API: https://euvat.ga/: https://euvat.ga/api/info/VATNUMBER
const platform = require('os').platform;
const fetch = require('node-fetch');

import vatList from './assets/vat.txt';
const url = 'https://euvat.ga/api/info/';

const myOs = platform(); // store the process.platform value as webpack somewhat gets rid of it if it's not (-> undefined)
const endOfLine = platform() === myOs ? '\r\n' : '\n'; // determines the characters used to terminate a line, per OS

const vat = vatList.split(endOfLine);
console.log(myOs, ' - ', endOfLine);
console.log(vat);

function fetchVatInfo(vat) {
  console.log(`URL: ${url}${vat}`);
  fetch(`${url}${vat}`)
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.error(`ERROR: ${err}`));
}

fetchVatInfo(vat[0]);

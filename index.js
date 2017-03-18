// API: https://euvat.ga/: https://euvat.ga/api/info/VATNUMBER
const script = require('commander');
const fs = require('fs');
const csv = require('csv');
const fetch = require('node-fetch');

const url = 'https://euvat.ga/api/info/';
let vatList = [];

// commander: setup the use of this script from the command line
script.version('0.0.1')
  .option('-l, --list [list]', 'list of VAT numbers in a CSV file')
  .parse(process.argv);

// parse the csv file
let stream = fs.createReadStream(script.list)
  .pipe(csv.parse({
    delimiter: ';',
    skip_empty_lines: true,
    trim: true
  }))
  .on('error', err => console.error(err.message))
  .on('data', vat => vatList.push(vat[0]))
  .on('end', () => console.log(vatList));

function fetchVatInfo (vat) {
  console.log(`URL: ${url}${vat}`);
  fetch(`${url}${vat}`)
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.error(`ERROR: ${err}`));
}

// fetchVatInfo(vat[0]);

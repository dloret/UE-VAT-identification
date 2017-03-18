// API: https://euvat.ga/: https://euvat.ga/api/info/VATNUMBER
const script = require('commander');
const fs = require('fs');
const csv = require('csv');
const fetch = require('node-fetch');

const url = 'https://euvat.ga/api/info/';
let vatList = [];
let companies = [];

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
  .on('data', vat => vatList.push(vat[0]));

stream.on('end', () => console.log(fetchVatInfo(vatList[0])));

function fetchVatInfo (vat) {
  console.log(`URL: ${url}${vat}`);
  fetch(`${url}${vat}`)
    .then(response => response.json())
    .then(company => {
      companies.push(`${company.countryCode};${company.countryCode}${company.vatNumber};${company.traderName};${company.traderAddress}`);
      console.log(companies);
    })
    .catch(err => console.error(`ERROR: ${err}`));
}


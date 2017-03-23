// API: https://euvat.ga/: https://euvat.ga/api/info/VATNUMBER
const script = require('commander');
const fs = require('fs');
const csv = require('csv');

const fetchVatInfo = require('./lib/utils').fetchVatInfo;

const url = 'https://euvat.ga/api/info/';
let vatList = [];
let result = 'list_of_companies.csv';
fs.writeFileSync(result, 'iso_country_code;VAT_number;company_name;legal_address\n', err => console.error(`WRITING ERROR: ${err}`));

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

// After loading the array of vat numbers, fetching the companies info from the API
stream.on('end', () => {
  vatList.map(vat => fetchVatInfo(url, vat)
    .then(company => {
      if (company.valid) {
        fs.appendFile(result,
                      `${company.countryCode};${company.countryCode}${company.vatNumber};${company.traderName};${company.traderAddress}\n`,
                      err => err ? console.error(`APPENDING ERROR: ${err}`) : null);
      } else {
        console.log(`${vat}: ${company.message}`);
        fs.appendFile(result,
                      `;${vat};${company.message};\n`,
                      err => err ? console.error(`APPENDING ERROR: ${err}`) : null);
      }
    })
  );
});

const csv = require('csv');
const fs = require('fs');
const path = require('path');
const script = require('commander');
const soap = require('soap-as-promised');

const api = 'http://ec.europa.eu/taxation_customs/vies/checkVatService.wsdl';
let vatList = [];

// commander: setup the use of this script from the command line
script.version('0.0.1')
  .option('-l, --list [list]', 'list of VAT numbers in a CSV file')
  .parse(process.argv);

// create the files to receive the ids and the errors
createFile(
  'list_of_companies.csv',
  'iso_country_code;VAT_number;valid;company_name;legal_address\n'
);
createFile(
  'vat_not_identified.csv',
  'vat_number\n'
);
const errorsPath = path.join(__dirname, 'vat_not_identified.csv');
const resultsPath = path.join(__dirname, 'list_of_companies.csv');

// parse the input csv file
let stream = fs.createReadStream(script.list)
  .pipe(csv.parse({
    delimiter: ';',
    skip_empty_lines: true,
    trim: true
  }))
  .on('error', err => console.error(`READING INPUT ERROR: ${err.message}`))
  .on('data', vat => vatList.push(vat[0]));

// query the soap API
stream.on('end', () => {
  vatList = vatList.map(vat => ({
    countryCode: vat.slice(0, 2),
    vatNumber: vat.slice(2)
  }));
  fetchVatList(vatList);
});

/********************
 * HELPER FUNCTIONS *
 * *****************/

const fetchVatList = (vatArgs) => {
  Promise.all(vatArgs.map(vat => soap.createClient(api)
    .then(client => client.checkVatApprox(vat))
    .then(result => {
      const data = JSON.parse(JSON.stringify(result).replace(/\\n/g, ', ').trim());
      writeInFile(
        resultsPath,
        `${data.countryCode};${data.countryCode}${data.vatNumber};${data.valid};${(data.traderName) ? data.traderName : 'no identification available'};${(data.traderAddress) ? data.traderAddress : 'no address available'}`
      );
    })
    .catch(error => {
      console.log(`ERROR: ${error}`);
      writeInFile(
        errorsPath,
        `${vat.countryCode}${vat.vatNumber}`);
    })
  ));
};

function createFile (filename, data) {
  fs.writeFileSync(
    filename,
    data,
    error => { if (error) console.error(`WRITING ERROR: ${error}`); }
  );
};

function writeInFile (file, message) {
  fs.appendFile(
    file,
    message + '\n',
    error => { if (error) console.log(`APPENDING ERROR: ${error}`); }
  );
};

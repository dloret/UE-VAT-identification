const fetch = require('node-fetch');
const fs = require('fs');

const errorFile = 'errors.txt';
fs.writeFileSync(errorFile, err => console.error(`WRITING ERROR: ${err}`));

exports.fetchVatInfo = (url, vat) => {
  // console.log(`URL: ${url}${vat}`);
  return fetch(`${url}${vat}`)
    .then(response => response.text())
    .then(data => String(data).replace(/\\n/gm, ' '))
    .then(data => JSON.parse(data))
    .catch((err, response) => {
      fs.appendFile(errorFile, `${vat}\n`, err => console.error(`WRITING ERROR: ${err}`));
    });
};

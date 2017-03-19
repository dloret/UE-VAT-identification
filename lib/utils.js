const fetch = require('node-fetch');

exports.fetchVatInfo = (url, vat) => {
  // console.log(`URL: ${url}${vat}`);
  return fetch(`${url}${vat}`)
    .then(response => response.text())
    .then(data => String(data).replace(/\\n/gm, ' '))
    .then(data => JSON.parse(data))
    .catch((err, response) => {
      console.error(`ERROR FETCHING: ${err}`);
      console.warn(`RESPONSE: ${response.responseText}`);
    });
};

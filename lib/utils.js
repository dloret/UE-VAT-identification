const fetch = require('node-fetch');

exports.fetchVatInfo = (url, vat) => {
  console.log(`URL: ${url}${vat}`);
  return fetch(`${url}${vat}`)
    .then(response => response.json())
    .catch(err => console.error(`ERROR: ${err}`));
};

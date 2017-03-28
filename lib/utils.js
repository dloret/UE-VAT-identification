const fetch = require('node-fetch');
const fs = require('fs');
const soap = require('soap');

exports.createFile = (filename, data) => {
  fs.writeFileSync(
    filename,
    data,
    error => console.error(`WRITING ERROR: ${error}`)
  );
};

exports.fetchVatInfo = async (url, vat) => {
  soap.createClient(url, (error, client) => {
    if (error) throw new Error(`COMMUNICATION ERROR: ${error}`);
    client.checkVatApprox(vat, (error, result) => {
      console.log(result);
    });
  });
};

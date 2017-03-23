const soap = require('soap');
const url = 'http://ec.europa.eu/taxation_customs/vies/checkVatTestService.wsdl';
const args = {
  vatNumber: 'GB182717394',
  countryCode: 'GB'
};

soap.createClient(url, (error, client) => {
  // if (error) throw new Error(error.message);
  client.checkVat(args, (err, result) => {
    // if (err) throw new Error(err.message);
    console.log(`
    HTTP STATUS: ${result.toJSON().statusCode}
    MESSAGE: ${result.toJSON().body}
    `);
  });
});

async function fetchVatInfo() {
  return;
}

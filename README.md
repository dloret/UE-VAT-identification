# UE-VAT-identification
From a European VAT numbers list, validate the id and list the companies (legal name and address)

## What you need

You need to have NodeJS installed, at least at version 7.7.0 (development version of this script)

## How to use it
 * Prepare a csv file containing the list of vat numbers, one number per line
 * run the script from the command line:

``` bash
cd UE-VAT-identification
node index.js -l path/to/my/vat/list.csv
```
The result will be delivered as another csv file containing the companies info: 'list_of_companies.csv'

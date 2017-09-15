const yargs = require('yargs');
const axios = require('axios');
const args = yargs.options({
    a: {
      alias: 'address',
      demandOption: true,
      describe: 'Address to fetch weather for',
      type: 'string'
    }
  })
  .help()
  .alias('help', 'h')
  .argv; // detail see the yargs api : https://github.com/yargs/yargs/blob/HEAD/docs/api.md


const googleMapBaseUrl =
  `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(args.a)}`;

axios.get(googleMapBaseUrl)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });

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

axios.get(googleMapBaseUrl, {
    //'http://yanbihu:R&Bmusic1005@proxy-sifi.rd.corpintra.net:3128'
    // proxy not work.
    proxy: {
      host: 'proxy-sifi.rd.corpintra.net',
      port: 3128,
      auth: {
        username: 'yanbihu',
        password: 'R&Bmusic1005'
      }
    }

  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });

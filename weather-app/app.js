const yargs = require('yargs');
const geocode = require('./geocode/geocode');
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

//console.log(args);

geocode.geocodeAddress(args.a, (error, results) => {
  if (error) {
    console.log(error);
  } else {
    console.log(JSON.stringify(results, undefined, 2));
    // actually we should fetch weather data with the results.lat and lng.
    // It's similart to geocode, passing lat and lng to an weather api, get either error or data and then show
  }

});

const yargs = require("yargs");
const geocode = require("./geocode/geocode");
const request = require("request");

const args = yargs
  .options({
    a: {
      alias: "address",
      demandOption: true,
      describe: "Address to fetch weather for",
      type: "string",
    },
  })
  .help()
  .alias("help", "h").argv; // detail see the yargs api : https://github.com/yargs/yargs/blob/HEAD/docs/api.md

//console.log(args);

const url = `http://api.weatherstack.com//current?query=${encodeURIComponent(yargs.argv.address)}&access_key=aaf72fc2c797004c35c4f80e5e1cb592`;
console.log(url);

request(
  {
    url: url,
    json: true, // it will automatically parse the body to a JSON Object
  },
  (error, response, body) => {
    if (error) {
      console.log(error);
    } else if (body.error) {
      console.log(`unable to determin location ${yargs.argv.address}`);
    } else {
      // console.log(response.body);
      // response.body is equal to body
      console.log(
        "Since the body is alreadly a JSON object, we could easily display it \n"
      );

      console.log(
        `${body.location.name} is currently ${body.current.temperature} degress out. It feels like ${body.current.feelslike} degree out.`
      );
    }
  }
);

// the second parameter is an object definded in method geocodeAddress
geocode.geocodeAddress(args.a, (error, { latitude, longtitude, location } = {}) => {
  if (error) {
    console.log(error);
  } else {
    // console.log(results);
    console.log(`latitude:${latitude},longtitude:${longtitude}, place:${location}`)
    // actually we should fetch weather data with the results.lat and lng.
    // It's similart to geocode, passing lat and lng to an weather api, get either error or data and then show
  }
});
// run node app.js -a='log angeles'
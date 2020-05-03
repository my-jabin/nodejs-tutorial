const request = require("request");

// this is a geocoding with mapbox(https://www.mapbox.com/). For geocoding with google map please check out commits fews year ago.

const token =
  "pk.eyJ1IjoiaHlieGlhb2RhbyIsImEiOiJjazlyNG16bGwwcXBrM2RxY2J1ZXNqeW9mIn0.ykIlC3EO432NZnE3MElwPA";
const baseUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/";

var geocodeAddress = (address, callback) => {
  let url = `${baseUrl}+${address}.json?access_token=${token}&limit=1`;
  console.log(`url: ${url}`);

  // request(options, callback)
  // options could be a url or an options object. Only required option is uri.
  // detail: https://github.com/request/request#requestoptions-callback
  request(
    {
      url, // url:url, because the name is identically, just use url for short
      json: true, // data is parsed automattically to JSON object
    },
    // this is a callback function
    (error, response, body) => {
      // error of our program
      if (error) {
        //console.log(JSON.stringify(error, undefined, 2));
        callback("no connection to server");
      } else if (body.features.length === 0) {
        callback("unable to get location");
      } else {
        // console.log(body.features[0]);
        let latitude = body.features[0].center[1];
        let longtitude = body.features[0].center[0];
        console.log(`${latitude},${longtitude}`);

        callback(undefined, { latitude: latitude, longtitude: longtitude, location: body.features[0].place_name });
      }
    }
  );
};

module.exports = {
  geocodeAddress,
};

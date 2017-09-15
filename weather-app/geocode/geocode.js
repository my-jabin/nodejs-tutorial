const request = require('request');

var geocodeAddress = (address, callback) => {
  const googleMapBaseUrl =
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`;
  //console.log(`address: ${googleMapBaseUrl}`);

  // request(options, callback)
  // options could be a url or an options object. Only required option is uri.
  // detail: https://github.com/request/request#requestoptions-callback
  request({
    url: googleMapBaseUrl,
    json: true
  }, (error, response, body) => {
    // error of our program
    if (error) {
      //console.log(JSON.stringify(error, undefined, 2));
      callback('no connection to server');
    }
    // print the HTTP response include headers, method
    //  console.log(JSON.stringify(response,undefined,2));

    // JSON.stringify(value[,replacer[,space]]): converts value to JSON string,
    // replaceing values if a replacer function is specified and space that for formating purpose
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
    //console.log(JSON.stringify(body,undefined,2));  // just for formatting json object

    // error of google map server
    else if (body.status === 'ZERO_RESULTS') {
      callback('no address found');
    } else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    }
  });

}

module.exports = {
  geocodeAddress
}

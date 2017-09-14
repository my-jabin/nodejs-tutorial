const request = require('request')
const yargs = require('yargs');
const args = yargs.options({
  a:{
    alias: 'address',
    demandOption: true,
    describe: 'Address to fetch weather for',
    type: 'string'
  }
})
.help()
.alias('help', 'h')
.argv; // detail see the yargs api : https://github.com/yargs/yargs/blob/HEAD/docs/api.md

console.log(args);

const googleMapBaseUrl =
  `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(args.a)}`;

console.log(`address: ${googleMapBaseUrl}`);

// request(options, callback)
// options could be a url or an options object. Only required option is uri.
// detail: https://github.com/request/request#requestoptions-callback
request( {
  url: googleMapBaseUrl,
  json: true,
  proxy: 'http://yanbihu:R&Bmusic1005@proxy-sifi.rd.corpintra.net:3128'
}, (error, response,body) =>{
  if(error){
      console.log(JSON.stringify(error,undefined,2));
      return;
  }

 // print the HTTP response include headers, method
 //  console.log(JSON.stringify(response,undefined,2));

  // JSON.stringify(value[,replacer[,space]]): converts value to JSON string,
  // replaceing values if a replacer function is specified and space that for formating purpose
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
  //console.log(JSON.stringify(body,undefined,2));  // just for formatting json object

  console.log(`Lat : ${body.results[0].geometry.location.lat} \nLng: ${body.results[0].geometry.location.lng}`);


});

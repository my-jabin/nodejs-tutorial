var env = process.env.NODE_ENV || "development";


if (env === "development" || env === "test") {
  // convert json file directly to an js object
  var config = require("./config.json");
  // if evn is development, get the development json object, or test json object
  var envConfig = config[env];

  // log all the keys of the config object
  //console.log(Object.keys(envConfig));

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });

}

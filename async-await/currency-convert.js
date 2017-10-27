// USD CAD 23
// 23 USD is worth 28 CAD. You can spend these in the following countries:

// two API that used in this example:
// http://fixer.io/
// https://restcountries.eu/
const axios = require('axios');

const getExchangeRate = (from, to) => {
  return axios.get(`http://api.fixer.io/latest?base=${from}`).then((response) => {
    return response.data.rates[to];
  })
}

const getExchangeRateAsync = async(from, to) => {
  try {
    var response = await axios.get(`http://api.fixer.io/latest?base=${from}`);
    var rate = response.data.rates[to];
    if (rate) {
      return rate;
    } else {
      throw new Error()
    }
  } catch (e) {
    throw new Error(`Unable to get exchange rate for ${from} and ${to}`);
  }
}

const getCountries = (currencyCode) => {
  return axios.get(`http://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {
    return response.data.map((country) => country.name);
  })
}

const getCountriesAsync = async(currencyCode) => {
  try {
    var response = await axios.get(`http://restcountries.eu/rest/v2/currency/${currencyCode}`);
    return response.data.map((country) => country.name);
  } catch (e) {
    throw new Error(`Unable to find counrties for ${currencyCode}`);
  }
}

const convertCurrency = (from, to, amount) => {
  let exchangedAmout;
  return getExchangeRate(from, to).then(rate => {
    exchangedAmout = rate * amount;
    return getCountries(to);
  }).then((countries) => {
    return `${amount} ${from} is worth ${exchangedAmout} ${to}. You can spend these in the following counrties: \n ${countries.join(", ")}`
  })
}

const convertCurrentyAsync = async(from, to, amount) => {
  var rate = await getExchangeRateAsync(from, to);
  var exchangedAmout = rate * amount;
  var countries = await getCountriesAsync(to);
  return `${amount} ${from} is worth ${exchangedAmout} ${to}. You can spend these in the following counrties: \n ${countries.join(", ")}`;
}

// getExchangeRate("USD", "CAD").then((rate) => {
//   console.log(rate);
// });
//
// getCountries("CNY").then(names => {
//   console.log(names);
// }).catch(e => {
//   console.log(e);
// })

// convertCurrency("CNY", "EUR", 1000).then(status => {
//   console.log(status);
// }).catch(e => {
//   console.log(e);
// })

convertCurrentyAsync("CNY", "acy", 1000).then(status => {
  console.log(status);
}).catch(e => {
  console.log(e.message);
})

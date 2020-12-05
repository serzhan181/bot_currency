const { default: Axios } = require('axios')
const mock = require('../mock')
require('dotenv').config()

async function convert(currency) {
  const currencies = await Axios.get(
    'https://currencyapi.net/api/v1/rates?key=vh8MB9L7TtlCLCn9Vg1vl0rhaWDAQuez56xx&base=USD'
  )
    .then((res) => res.data)
    .catch((err) => console.log(err))

  const findInReq = currencies.rates[currency]

  return findInReq
}

exports.convert = convert

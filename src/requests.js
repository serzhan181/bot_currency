const mock = require('../mock')

async function convert(currency) {
  const res = mock.rates[currency]

  return res
}

exports.convert = convert

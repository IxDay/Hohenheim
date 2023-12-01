const util = require('util')

const pp = (obj) => {
  const opts = {showHidden: false, depth: null, colors: true}
  console.log(util.inspect(obj, opts))
}

module.exports = {
  pp: pp
}

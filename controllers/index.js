
const categories = require('./categories')
const auth       = require('./auth')
const users      = require('./users')
const products   = require('./products')
const searchs     = require('./search')

module.exports = {
    ...categories,
    ...auth,
    ...users,
    ...products,
    ...searchs
}
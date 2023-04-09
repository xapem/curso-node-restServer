
const Category = require('./category')
const Role     = require('./role')
const User     = require('./user')
const Product  = require('./product')
const Server   = require('./server')

module.exports = {
        Category,
        Role,
        User,
        Product,
        Server,
}

// Esto es otra forma
// module.exports = require('./category')
// module.exports = require('./role')
// module.exports = require('./user')
// module.exports = require('./server')



const User = require('./users')
const Disc = require('./discs')
const Artist = require('./artists')
const Cart = require('./cart')
const Order = require('./order')
const Genre = require('./genre')

User.belongsTo(Cart, {as: 'user'})
User.hasMany(Order, {as:'orders'})




module.exports = {User, Disc, Artist, Cart, Order, Genre}
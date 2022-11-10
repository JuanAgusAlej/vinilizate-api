const User = require("./users");
const Disc = require("./discs");
const Artist = require("./artists");
const Cart = require("./cart");
const Order = require("./order");
const Genre = require("./genre");
const Role = require('./role')

User.hasOne(Cart, {as: 'user'});
Cart.belongsTo(User)
User.belongsToMany(Disc, { through: "desireList" });
Disc.belongsToMany(User, { through: "desireList" });
User.hasMany(Order);
Order.belongsTo(User, {as: 'user'})
User.belongsTo(Role, {as :'role'})
Role.hasMany(User)
Disc.belongsTo(Artist, {as:'artist'})
Artist.hasMany(Disc)
Disc.belongsTo(Genre, {as:'genre'})
Genre.hasMany(Disc)


//Genre.hasOne(Artist)
//Artist.belongsTo(Genre)
//Genre.hasMany(Artist)
//Artist.belongsTo(Genre)
//Genre.belongsTMany(Artist, throw:'')

module.exports = { User, Disc, Artist, Cart, Order, Genre , Role};



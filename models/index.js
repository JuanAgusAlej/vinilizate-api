const User = require("./users");
const Disc = require("./discs");
const Artist = require("./artists");
const Cart = require("./cart");
const Order = require("./order");
const Genre = require("./genre");
const Role = require("./role");
const Item = require("./items");


User.belongsTo(Cart, { as: "cart" });
Cart.belongsTo(User, { as: "user" });

User.belongsToMany(Disc, { through: "desireList" });
Disc.belongsToMany(User, { through: "desireList" });
User.hasMany(Order);
Order.belongsTo(User, { as: "user" });
User.belongsTo(Role, { as: "role" });
Role.hasMany(User);
Disc.belongsTo(Artist, { as: "artist" });
Artist.hasMany(Disc);
Disc.belongsTo(Genre, { as: "genre" });
Genre.hasMany(Disc);

Order.belongsTo(Cart, { as: "cart" });



Cart.hasMany(Item);
Item.belongsTo(Cart);
Item.belongsTo(Disc);

module.exports = { User, Disc, Artist, Cart, Order, Genre, Role, Item };

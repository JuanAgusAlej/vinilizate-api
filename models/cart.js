const S = require("sequelize");
const db = require("../DB/index");

class Cart extends S.Model {}

Cart.init({}, { sequelize: db, modelName: "carts" });

module.exports = Cart;

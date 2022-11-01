const S = require("sequelize");
const db = require("../DB/index");

class Cart extends S.Model {}

Cart.init(
  {
   products: {
    type:S.STRING,
   }

  },{sequelize: db, modelName:'carts'})

  module.exports = Cart
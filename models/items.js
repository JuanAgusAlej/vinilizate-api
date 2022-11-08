const S = require("sequelize");
const db = require("../DB/index");

class Item extends S.Model {}

Item.init(
  {
   cantidad: {
    type:S.INTEGER,
    defaultValue: "1",
   }

  },{sequelize: db, modelName:'items'})

  module.exports = Item
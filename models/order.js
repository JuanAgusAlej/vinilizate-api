const S = require("sequelize");
const db = require("../DB/index");

class Order extends S.Model {}

Order.init(
  {
   products: {
    type:S.STRING,
   },
   totalValue: {
    type:S.INTEGER
   },
   adress: {
    type:S.STRING,
    
   },
   
   locality: {
    type: S.STRING
   },

   extra: {
    type:S.STRING
   }



  },{sequelize: db, modelName:'orders'})

  module.exports = Order
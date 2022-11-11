const S = require("sequelize");
const db = require("../DB/index");

class Order extends S.Model {}

Order.init(
  {
    adress: {
      type: S.STRING,
    },

    locality: {
      type: S.STRING,
    },
    totalValue: {
      type: S.INTEGER,
    },
  },
  { sequelize: db, modelName: "orders" }
);

module.exports = Order;

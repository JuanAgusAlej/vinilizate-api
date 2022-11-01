const S = require("sequelize");
const db = require("../DB/index");

class Disc extends S.Model {}


Disc.init(
    {
      img: {
        type:S.STRING,

      },
      name: {
        type:S.STRING,
        allowNull:false,
      },
      price: {
        type: S.INTEGER,
      },

      rating: {
        type: S.INTEGER
      },
      
      promotion: {
        type: S.INTEGER
      }, 

      stock: {
        type:S.INTEGER
      }

},{sequelize: db, modelName:'discs'})     

module.exports = Disc
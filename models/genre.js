const S = require("sequelize");
const db = require("../DB/index");

class Genre extends S.Model {}

Genre.init(
  {
   genre: {
    type:S.STRING,
   }

  },{sequelize: db, modelName:'genres'})

  module.exports = Genre
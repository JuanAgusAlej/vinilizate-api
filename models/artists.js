const S = require("sequelize");
const db = require("../DB/index");

class Artist extends S.Model {}

Artist.init(
  {
    name: {
      type: S.STRING,
      allowNull: false,
    },
    lastName: {
      type:S.STRING,
      allowNull:false
    }

  },{sequelize: db, modelName:'artists'});

  module.exports = Artist
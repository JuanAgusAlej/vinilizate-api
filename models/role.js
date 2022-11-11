const S = require("sequelize");
const db = require("../DB/index");

class Role extends S.Model {}

Role.init(
  {
    role: {
        type: S.STRING
    }

  },{sequelize: db, modelName:'roles'})

  module.exports = Role
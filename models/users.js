const S = require("sequelize");
const db = require("../DB/index");
const bcrypt = require("bcryptjs");

class User extends S.Model {}

User.init(
  {
    name: {
      type: S.STRING,
      allowNull: false,
    },
    lastName: {
      type: S.STRING,
      allowNull: false,
    },
    email: {
      type: S.STRING,
      allowNull: false,
    },
    role_id : {
      type: S.STRING
    },
    
    password: {
      type: S.STRING,
      allowNull: false,
    },
    salt: {
      type: S.STRING,
    },
  },
  { sequelize: db, modelName: 'users' }
);

module.exports = User
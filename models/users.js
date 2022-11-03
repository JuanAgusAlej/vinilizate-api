const S = require("sequelize");
const db = require("../DB/index");
const bcrypt = require("bcryptjs");

class User extends S.Model {
  // hash(password, salt) {
  //   return bcrypt.hash(password, salt);
  // }
}

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

    password: {
      type: S.STRING,
      allowNull: false,
    },
    salt: {
      type: S.STRING,
    },
  },
  { sequelize: db, modelName: "users" }
);


  User.prototype.hash = function(password, salt) {
  return bcrypt.hash(password, salt);
}

User.beforeCreate((user) => {
  user.salt = bcrypt.genSaltSync();
  return user.hash(user.password, user.salt).then((hash) => {
    user.password = hash;
  });
})

module.exports = User;

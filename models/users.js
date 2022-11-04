const S = require("sequelize");
const db = require("../DB/index");
const bcrypt = require("bcrypt");

class User extends S.Model {
  validatePassword (password) {
    console.log('SALT',this.salt)
    return bcrypt.hash(password, this.salt)
  
    .then(newHash => newHash === this.password)
   }
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

  // Métodos de instancia
  User.prototype.hash = function(password, salt) {
  return bcrypt.hash(password, salt);
}

 

 //Hooks
User.beforeCreate((user) => {
  user.salt = bcrypt.genSaltSync();
  return user.hash(user.password, user.salt).then((hash) => {
    user.password = hash;
  });
})


module.exports = User;

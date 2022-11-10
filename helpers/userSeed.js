const User = require("../models/users");
const db = require("../DB/index.js");
const Role = require("../models/role");

const userAdmin = {
  name: "luciano",
  lastName: "sciarretta",
  email: "clsciarretta",
  password: "bandoneón",
};

const userSeed = () => {
  User.bulkCreate(userAdmin).then((user) => {
    Role.findOne({ where: { role: "admin" } }).then((role) => {
        console.log(role)
      user.setRole(role)
    return Promise.all(user)
    });
  });
};

db.sync()
  .then(userSeed)
  .then(console.log(""))
  .catch((error) => console.log("Tutto male"))


  module.exports = userSeed

const express = require("express");
const { validateToken } = require("../AUTH/tokens");
const validateRolAdmin = require("../helpers/validateRol");
const adminRouter = express.Router();
const { User, Role } = require("../models");

//Ruta de registro para administrador

adminRouter.post("/register", (req, res) => {
  User.create(req.body).then((user) => {
    Role.findOne({
      where: { role: "admin" },
    })
      .then((role) => {
        user.setRole(role);
        res.status(201).send(user);
      })
      .catch((error) => res.send(error));
  });
});

//Ruta para ver todos los usuarios

adminRouter.get("/", (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.sendStatus(401);
  console.log(validateRolAdmin(token));
  if (!validateRolAdmin(token)) {
    return res.status(403).send("No tiene los permisos necesarios");
  }
  User.findAll({
    include: { model: Role, as: "role" },
  })
    .then((users) => res.send(users))
    .catch((error) => res.send(error));
});

//Ruta para borrar usuario

adminRouter.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  const token = req.cookies.token;

  if (!token) return res.sendStatus(401);
  console.log(validateRolAdmin(token));
  if (!validateRolAdmin(token)) {
    return res.status(403).send("No tiene los permisos necesarios");
  }
  User.destroy({ where: { id } })
    .then((deletedUser) =>
      res.status(203).send("Usuario eliminado correctamente")
    )
    .catch((error) => res.status(400).send("Ocurrió un error"));
});

//Ruta para promover administradores

adminRouter.put("/:id", (req, res) => {
  const { id } = req.params;

  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);
  console.log(validateRolAdmin(token));
  if (!validateRolAdmin(token)) {
    return res.status(403).send("No tiene los permisos necesarios");
  }

  User.update({ roleId: 1 }, { where: { id } })
    .then((updatedUser) =>
      res.status(200).send("El usuario ahora tiene rol de Administrador")
    )
    .catch((error) => res.status(400).send(error));
});

module.exports = adminRouter;

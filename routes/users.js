const express = require("express");
const usersRouter = express.Router();
const { User } = require("../models");

usersRouter.get("/", (req, res) => {
  User.findAll().then((users) => res.send(users));
});

usersRouter.post("/register", (req, res) => {
  User.create(req.body).then((user) => res.status(201).send(user));
});



  

module.exports = usersRouter;

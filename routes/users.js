const express = require("express");
const usersRouter = express.Router();
const { User } = require("../models");
const { generateToken, validateToken } = require("../AUTH/tokens");

usersRouter.get("/", (req, res) => {
  User.findAll().then((users) => res.send(users));
});

usersRouter.post("/register", (req, res) => {
  User.create(req.body).then((user) => res.status(201).send(user));
});

usersRouter.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  User.findOne({ where: { email: email } }).then((user) => {
    console.log("USER", user)
    if (!user) return res.sendStatus(401);
    user.validatePassword(password).then((isValid) => {
      console.log('vaLID', isValid)
      if (!isValid) return res.sendStatus(401);

      // Si encuentra al usuario por el email y el password hasheado coincide con el del registro
      //prosigue la generación de un token

      const payload = {
        email: user.email,
        name: user.name,
        lastName: user.lastName,
      };
       const token = generateToken(payload);

      res.cookie("token", token);
      res.send({ payload, token });
    });
  });
});

usersRouter.get("/secret", (rea, res) => {
  const token = res.cookie.token;

  const { user } = validateToken(token);

  res.send(user);
});

usersRouter.get("/me", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  const { user } = validateToken(token);

  if (!user) return res.sendStatus(401);
  res.send(user);
});

usersRouter.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
});


usersRouter.put("/:id", async (req, res, next) => {
  const id = req.params.id
  const {name,lastName,email, password} = req.body
  try {
      const updated = await User.update({ name,lastName,email,password }, { where: { id } })
      res.status(201).send(updated[1])
  }
  catch (e) { res.status(503).end() }
});




module.exports = usersRouter;

const express = require("express");
const usersRouter = express.Router();
const { User, Role, Cart } = require("../models");
const { generateToken, validateToken } = require("../AUTH/tokens");

//Ruta de registro de user
usersRouter.post("/register", (req, res) => {
  const { name, lastName, email, password } = req.body;
  const user = {
    name,
    lastName,
    email,
    password,
  };
  User.create(user).then((user) => {
    Role.findOne({ where: { role: "user" } })
      .then((role) => {
        user.setRole(role);
        Cart.create().then((cart) => {
          user.setCart(cart);
          cart.setUser(user);
          res.status(201).send(user);
        });
      })
      .catch((error) => res.send(error));
  });
});

//Ruta de login

usersRouter.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  User.findOne({
    where: { email: email },
    include: { model: Role, as: "role" },
  }).then((user) => {
    console.log("USER", user);
    if (!user) return res.sendStatus(401);
    user.validatePassword(password).then((isValid) => {
      console.log("VALID", isValid);
      if (!isValid) return res.sendStatus(401);

      console.log(user);
      const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        role: user.role.role,
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
  console.log(user);
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
  res.status(204).send("Logout exitoso");
});

//rutas de admin


usersRouter.put("/:id", async (req, res, next) => {
  const id = req.params.id
  const {name,lastName,email, password} = req.body
  try {
      const updated = await User.update({ name,lastName,email,password }, { where: { id } })
      res.status(201).send(updated[1])
  }
  catch (e) { res.status(503).end() }
});



// usersRouter.post("/register", (req, res) => {
//   const {name, lastname, email, password} = req.body;
//   const user = {
//   name,
//   lastName,
//   email,
//   password
//   }
//     User.create(user).then((user) => res.status(201).send(user));
//   })

module.exports = usersRouter;

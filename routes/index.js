const express = require("express");
const router = express.Router();
const productsRouter = require("./products");
const usersRouter = require("./users");
const cartRouter = require("./cart");
const genreRouter = require("./genre");

router.use("/products", productsRouter);

router.use("/users", usersRouter);

router.use("/cart", cartRouter);

router.use("/genre", genreRouter);

module.exports = router;

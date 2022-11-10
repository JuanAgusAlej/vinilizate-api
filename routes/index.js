const express = require("express");
const router = express.Router();
const productsRouter = require("./products");
const usersRouter = require("./users");
const cartRouter = require("./cart");

const adminRouter = require('./admin')



const genreRouter = require("./genre");

const checkoutRouter = require("./checkout");

const artistsRouter = require("./artists");

router.use("/artists", artistsRouter);

router.use('/admin', adminRouter)


router.use("/products", productsRouter);

router.use("/users", usersRouter);

router.use("/cart", cartRouter);

router.use("/genre", genreRouter);



router.use("/checkout", checkoutRouter);


module.exports = router;

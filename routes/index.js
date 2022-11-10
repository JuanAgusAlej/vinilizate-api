const express = require("express");
const router = express.Router();
const productsRouter = require("./products");
const usersRouter = require("./users");
const cartRouter = require("./cart");
const adminRouter = require('./admin')



router.use('/admin', adminRouter)

router.use("/products", productsRouter);

router.use("/users", usersRouter);

router.use("/cart", cartRouter);



module.exports = router;

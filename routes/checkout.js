const { mailSender } = require("../helpers/nodemailer");
const express = require("express");
const checkoutRouter = express.Router();
const Cart = require("../models/cart");
const Order = require("../models/order");

//mailSender();

checkoutRouter.get("/:id", (req, res, next) => {
  Order.findAll({ where: { userId: req.params.id } });
});

checkoutRouter.get("/", (req, res, next) => {});

module.exports = checkoutRouter;

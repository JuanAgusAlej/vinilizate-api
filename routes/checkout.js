const { mailSender } = require("../helpers/nodemailer");
const express = require("express");
const checkoutRouter = express.Router();
const Cart = require("../models/cart");
const Order = require("../models/order");
const { Item, User } = require("../models");

//mailSender();

checkoutRouter.post("/:userId", (req, res, next) => {
  User.findByPk(req.params.userId).then((user) => {
    Item.findAll({ where: { cartId: user.cartId } }).then((items) => {
      Order.create(req.body).then((order) => {
        order.setUser(user);
        order.setCart(user.cartId);
        mailSender(order, user, items);
        res.send(order);
      });
    });
  });
});

checkoutRouter.post("/newCart/:userId", (req, res) => {
  User.findByPk(req.params.userId).then((user) => {
    Cart.create().then((cart) => {
      user.setCart(cart);
      cart.setUser(user);
      res.send(cart);
    });
  });
});

checkoutRouter.get("/:userId", (req, res, next) => {
  Order.findAll({ where: { userId: req.params.userId } }).then((orders) => {
    res.send(orders);
  });
});

checkoutRouter.get("/:cartId", (req, res, next) => {
  Item.findAll({ where: { carteId: req.params.cartId } }).then((items) => {
    res.send(items);
  });
});

module.exports = checkoutRouter;

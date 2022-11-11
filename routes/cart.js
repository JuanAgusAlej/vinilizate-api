const express = require("express");

const cartRouter = express.Router();

const { Cart, Disc, Item, User } = require("../models");

cartRouter.post("/:userId/:discId", (req, res) => {
  //ruta para agregar un producto al carrito
  const discId = req.params.discId;

  User.findByPk(req.params.userId).then((user) => {
    Disc.findByPk(discId)
      .then((disc) => {
        Cart.findByPk(user.cartId).then((cart) =>
          Item.create().then((item) => {
            item.setDisc(disc);
            item.setCart(cart);
            res.send(item);
          })
        );
      })
      .catch((err) => res.status(400).send(err));
  });
});

cartRouter.delete("/:userId/:discId", (req, res) => {
  //ruta para eliminar un producto del carrito
  User.findByPk(req.params.userId).then((user) => {
    Item.findOne({
      where: {
        cartId: user.cartId,
        discId: req.params.discId,
      },
    }).then((item) => {
      Item.destroy({
        where: { id: item.id },
      }).then(() => res.sendStatus(204));
    });
  });
});

cartRouter.put("/:userId/:discId", (req, res) => {
  // ruta para editar la cantidad del producto del carrito
  User.findByPk(req.params.userId).then((user) => {
    Item.update(req.body, {
      where: {
        cartId: user.cartId,
        discId: req.params.discId,
      },
      returning: true,
    }).then((item) => {
      res.send(item[1][0]);
    });
  });
});

module.exports = cartRouter;

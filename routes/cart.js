const express = require("express");

const cartRouter = express.Router();

const { Cart, Disc, Item, User } = require("../models");


cartRouter.post("/:cartId/:discId", (req, res) => {
  //ruta para agregar un producto al carrito

  const cartId = req.params.cartId;
  const discId = req.params.discId;

  Disc.findByPk(discId)
    .then((disc) => {
      Cart.findByPk(cartId).then((cart) =>
        Item.create().then((item) => {
          item.setDisc(disc);
          item.setCart(cart);
          res.send(item);
        })
      );
    })
    .catch((err) => res.status(400).send(err));
});

cartRouter.delete("/:cartId/:discId", (req, res) => {
  //ruta para eliminar un producto del carrito

  Item.destroy({
    where: {
      cartId: req.params.cartId,
      discId: req.params.discId,
    },
  }).then(() => res.sendStatus(204));
});

cartRouter.put("/:cartId/:discId", (req, res) => {
  // ruta para editar la cantidad del producto del carrito

  Item.update(req.body, {
    where: {
      cartId: req.params.cartId,
      discId: req.params.discId,
    },
    returning: true,
  }).then((item) => {
    res.send(item[1][0]);
  });
});

module.exports = cartRouter;

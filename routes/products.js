const express = require("express");
const productsRouter = express.Router();
const Disc = require("../models/discs");
const Artist = require("../models/artists");
const Genre = require("../models/genre");

productsRouter.get("/", (req, res, next) => {
  Disc.findAll()
    .then((discs) => {
      console.log("get discs hecho");
      res.status(200).send(discs);
    })
    .catch(next);
});

productsRouter.get("/:id", (req, res, next) => {
  Disc.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((disc) => {
      console.log("producto especifico encontrado");
      res.status(200).send(disc);
    })
    .catch(next);
});

productsRouter.post("/", (req, res, next) => {
  Disc.create(req.body)
    .then((disc) => {
      console.log("disco creado");
      res.status(201).send(disc);
    })
    .catch(next);
});

productsRouter.put("/:id", (req, res, next) => {
  Disc.update(req.body, {
    where: {
      id: req.params.id,
    },
    returning: true,
  })
    .then(([filasCamb, disc]) => {
      res.send(disc);
    })
    .catch(next);
});

productsRouter.delete("/:id", (req, res, next) => {
  Disc.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() => {
    res.sendStatus(204);
  });
});

module.exports = productsRouter;

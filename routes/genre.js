const express = require("express");

const genreRouter = express.Router();
const { Genre } = require("../models");

genreRouter.post("/", (req, res) => {
  const { genre } = req.body;
  const dato = {};
  if (genre?.trim()?.length !== 0) dato.genre = genre;
  if (!dato.genre) return res.status(400).send("informacion mal enviada");

  Genre.create(dato)
    .then((gen) => res.status(201).send(gen))
    .catch((err) => res.status(400).send(err));
});

genreRouter.delete("/:id", (req, res) => {
  Genre.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() => {
    res.send(204);
  });
});

genreRouter.put("/:id", (req, res) => {
  const { genre } = req.body;
  const dato = {};
  if (genre.trim().length !== 0) dato.genre = genre;

  if (!dato.genre) return res.status(400).send("dato vacio");
  Genre.update(
    { genre },
    {
      where: {
        id: req.params.id,
      },
      returning: true,
    }
  ).then((cat) => {
    res.status(202).send(cat[1][0]);
  });
});

genreRouter.get("/", (req, res) => {
  Genre.findAll()
    .then((gen) => res.status(200).send(gen))
    .catch((err) => res.status(400).send(err));
});

module.exports = genreRouter;

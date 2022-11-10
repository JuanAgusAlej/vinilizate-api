const express = require("express");
const Artist = require("../models/artists");
const artistsRouter = express.Router();

artistsRouter.post("/", (req, res) => {
  Artist.create(req.body).then((art) => {
    res.status(201).send(art);
  });
});

module.exports = artistsRouter;

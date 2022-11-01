const express = require("express");
const cors = require("cors");
const { dbConection } = require('../database/conectBD');
require("dotenv").config();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.userPath = "/api/user";
    this.middleware();
    //Rutas
    this.routes();

    this.conectBD();
  }
  async conectBD() {
    await dbConection();
  }
  //middleware
  middleware() {
    //cors
    this.app.use(cors());

    //directorio publico
    this.app.use(express.static("public"));

    //lectura y parseo del body
    this.app.use(express.json());

  }

  routes() {
   // this.app.use(this.userPath, require("../routes/user.js"));

  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`);
    });
  }
}

module.exports = Server;

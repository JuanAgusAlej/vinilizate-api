const express = require("express");
const app = express();
const volleyball = require("volleyball");
const cors = require("cors");
const db = require("./DB/index");
const { User, Disc, Artist, Cart, Order, Genre, Role } = require("./models/index");
const routes = require('./routes')
app.use(volleyball);

// googlear más tarde
app.use(cors({ credentials: true, origin: "http://localhost:3000/" }));

app.use(express.json());

app.use("/api", routes);

db.sync({ force: false })
  .then(() => {
    console.log("DB CONNECTED");
    app.listen(3000, () => console.log("Server listening at port 3000"));
  })
  .catch((error) => console.log(error));



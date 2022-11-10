const express = require("express");
const app = express();
const volleyball = require("volleyball");
const cors = require("cors");
const db = require("./DB/index");
const {
  User,
  Disc,
  Artist,
  Cart,
  Order,
  Genre,
  Role,
  Item,
} = require("./models/index");
const routes = require("./routes");
const cookieParser = require("cookie-parser");


app.use(volleyball);

// googlear más tarde
app.use(cors());


app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

db.sync({ force: false })
  .then(() => {
    console.log("DB CONNECTED");
    app.listen(3000, () => console.log("Server listening at port 3000"));
  })
  .catch((error) => console.log(error));

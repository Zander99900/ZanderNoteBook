const connectToMongo = require("./db");
const express = require("express");

connectToMongo();
//Connected to Express Js
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello Zander!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

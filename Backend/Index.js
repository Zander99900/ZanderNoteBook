const connectToMongo = require("./db");
const express = require("express");

connectToMongo();
//Connected to Express Js
const app = express();
const port = 3000;

//basic app get response syntax
app.get("/", (req, res) => {
  res.send("Hello Zander!");
});

//using available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`ZanderNotes app listening on http://localhost:${port}`);
});

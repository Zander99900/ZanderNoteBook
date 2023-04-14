const connectToMongo = require("./db");
const express = require("express");

connectToMongo();
//Connected to Express Js
const app = express();
const port = 5000;

//basic app get response syntax
app.use(express.json())

//using available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`ZanderNotes app listening on http://localhost:${port}`);
});

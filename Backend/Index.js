const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");

connectToMongo();
//Connected to Express Js using cors to clear errors for API Calls
const app = express();
const port = 5000;

//basic app get response syntax
app.use(cors());
app.use(express.json());

//using available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`ZanderNotes app listening on http://localhost:${port}`);
});

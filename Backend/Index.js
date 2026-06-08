const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");

// Connected to Express Js using cors to clear errors for API Calls
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

const startServer = async () => {
  await connectToMongo();
  app.listen(port, () => {
    console.log(`ZanderNotes app listening on http://localhost:${port}`);
  });
};

startServer();

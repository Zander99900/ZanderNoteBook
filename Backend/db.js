const mongoose = require('mongoose');
var mongoURI = "mongodb://localhost:27017/?readPreference=primary"
connectToMongo().catch(err => console.log(err));

async function connectToMongo() {
  await mongoose.connect(mongoURI);
  console.log("Connected to Mongo Successfully");
}
module.exports = connectToMongo;
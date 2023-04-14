const mongoose = require('mongoose');
var mongoURI = "mongodb://0.0.0.0:27017/ZanderNoteBook?readPreference=primary"
// connectToMongo().catch(err => console.log(err));

async function connectToMongo() {
  await mongoose.connect(mongoURI);
  console.log("Connected to Mongo Successfully");
}
module.exports = connectToMongo;
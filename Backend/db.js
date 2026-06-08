const mongoose = require("mongoose");

const mongoURI =
  process.env.MONGO_URI ||
  "mongodb://127.0.0.1:27017/ZanderNoteBook";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, { family: 4 });
    console.log("Connected Successfully to MongoDB");
  } catch (err) {
    console.error("Mongo Error:", err.message || err);
    console.error(
      "Please start MongoDB locally, or set MONGO_URI to a valid MongoDB connection string."
    );
    process.exit(1);
  }
};

module.exports = connectToMongo;
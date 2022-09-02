// connection.js
const mongoose = require("mongoose");
const connection = "mongodb://mongodb:27017/crawlab_test";
const connectDb = () => {
  return mongoose.connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
module.exports = connectDb;
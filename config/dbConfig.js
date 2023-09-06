const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

exports.connect = () => {
  mongoose
    .connect(process.env.MONGO_URI, { dbName: process.env.DB_NAME })
    .then(() => console.log("Connected SuccessFully"))
    .catch((e) => {
      console.log("Fail Connected " + e);
    });
};

const { mongoose } = require("mongoose");
require("dotenv").config();

URL = process.env.DATABASE_URL;

const dbConnect = () => {
  mongoose
    .connect(URL)
    .then(() => {
      console.log("Server Connection with Database : Successful");
    })
    .catch((err) => {
      console.error(err);
      console.log("Server Connection with Database: Failed");
      process.exit(1);
    });
};
module.exports = dbConnect;

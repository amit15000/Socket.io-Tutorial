const express = require("express");
const dbConnect = require("./Config/database");
dbConnect();
const app = express();
require("dotenv").config();
PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server Running Successfuly on ${PORT}`);
});

"use strict";
const mongoose = require("mongoose");

const connectString = `mongodb://0.0.0.0:27017/`;

mongoose
  .connect(connectString)
  .then((_) => console.log("connected mongodb success"))
  .catch((error) => console.log(error));

// dev
if (1 === 1) {
  mongoose.set("debug", true);
  mongoose.set("debug", { color: true });
}

module.exports = mongoose;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  celular: String,
  senha: String,
  facebook: String,
  instagram: String,
});

module.exports = mongoose.model("User", userSchema);

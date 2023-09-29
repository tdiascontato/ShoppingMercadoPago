const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  celular: String,
  senha: String,
  facebook: String,
  instagram: String,
  endereco: String,
  bairro: String,
  cidade: String,
  cep: String,
  keymercadopago: String,
  premium: Boolean
}); 

module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referência ao modelo User
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Item", itemSchema);
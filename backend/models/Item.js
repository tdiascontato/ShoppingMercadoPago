const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Item", schema);


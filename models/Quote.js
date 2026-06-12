const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({
  content: String,
  author: String,
  favorite: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Quote", quoteSchema);
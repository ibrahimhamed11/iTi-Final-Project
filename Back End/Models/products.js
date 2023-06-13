const mongoose = require("mongoose");
const user = require('./Users');

const productSchema = new mongoose.Schema({


  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  image: { type: String },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    role: "seller",
  },
  rate: [{ type: Number }],
}, {
  strict: false,
  versionKey: false,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

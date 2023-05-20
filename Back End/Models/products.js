const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  // image: { type: String, required: true },
  reviews: [{ type: String, date: { type: Date, default: Date.now } }],
  seller: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    role: "seller",
  },
},{
  strict:false,
  versionKey:false,
});


const products = mongoose.model('products', productSchema);

module.exports = products;
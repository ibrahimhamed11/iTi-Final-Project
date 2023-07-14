const mongoose = require('mongoose');

// Creating orders schema
const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    sellerId: { type: mongoose.Types.ObjectId, ref: 'Seller', required: true },
    phoneNumber: { type: Number },
    shippingAddress: {
        street: { type: String, required: false },
        city: { type: String, required: false },
        zipCode: { type: String, required: false },
        country: { type: String, required: false }
    },
    delStatus: {
        type: String,
        enum: ['pending', 'delivered', 'canceled', 'shipped'],
        default: 'pending'
    },
    date: { type: Date, default: Date.now },
    products: [
        {
            productName: { type: String },
            productId: { type: mongoose.Types.ObjectId, ref: 'Product', required: true },
            qty: { type: Number, required: false },
            checkRate: { type: Boolean, default: false }
        }
    ]
}, {
    strict: false,
    versionKey: false
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

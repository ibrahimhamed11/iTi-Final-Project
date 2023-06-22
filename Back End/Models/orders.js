const mongoose = require('mongoose');


//Creating orders schema
const orderSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    productId: { type: mongoose.Types.ObjectId, ref: 'products', required: true },
    qty: { type: Number, required: false },
    shippingAdress: {
        street: { type: String, required: false },
        city: { type: String, required: false },
        zipCode: { type: String, required: false },
        country: { type: String, required: false }
    },
    delStatus: {
        type: String,
        enum: ['pending', 'delivered', 'canceled'],
        default: 'pending'
    },
    // payMethod:{type: String}, to be handeld later
    date: { type: Date, default: Date.now }

}, {
    strict: false,
    versionKey: false,
})

const orders = mongoose.model('orders', orderSchema);



module.exports = orders;
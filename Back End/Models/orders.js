const mongoose = require('mongoose');


//Creating orders schema
const orderSchema = new mongoose.Schema({
    // userId:{type: mongoose.Types.ObjectId, ref:'User', required:true},
    // productId:{type: mongoose.Types.ObjectId, ref:'products' , required: true},
    qty: {type: Number, required: true},
    // shippingAdress:{
    //     street:{type: String, required: true},
    //     city:{type: String, required: true},
    //     zipCode:{type: String, required: true},
    //     country:{type: String, required: true}
    // },
    delStatus:{
        type: String,
        enum: ['pending','in progess',' delivered','canceled' ],
        default: 'pending'
    },
    // payMethod:{type: String}, to be handeld later
    date:{type: Date, default: Date.now}

},{
    strict:false,
    versionKey:false,
  })

const orders= mongoose.model('orders', orderSchema);



module.exports= orders;
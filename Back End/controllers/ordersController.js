const orders = require('../Models/orders');

exports.createOrder =async (req,res) => {
    console.log(req.body)
    const {userId,productId,qty,shippingAdress,delStatus,date} = req.body;
    const order = new orders({userId,productId,qty,shippingAdress,delStatus,date});
    const savedOrder = await order.save();
    res.status(201).json({savedOrder , status:201});
}

exports.getAllOrders = async (req,res) => {
    const order = await orders.find()
    res.send({data:order});
}

exports.getById = async (req,res) => {
    const order = await orders.findById(req.params.id);
    res.send(order)
}

exports.updateOrder = async (req,res) => {
    const update = await orders.findByIdAndUpdate(req.params.id,req.body);
    res.send(update)
}

exports.delOrder = async (req,res) => {
    const deleted = await orders.findByIdAndDelete(req.params.id)
    res.send(deleted)
}


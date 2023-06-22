const orders = require('../Models/orders');

exports.createOrder = async (req, res) => {
    console.log(req.body)
    const { productName, userId, productId, qty, shippingAdress, delStatus, date } = req.body;
    const order = new orders({ productName, userId, productId, qty, shippingAdress, delStatus, date });
    const savedOrder = await order.save();
    res.status(201).json({ savedOrder, status: 201 });
}

exports.getAllOrders = async (req, res) => {
    const order = await orders.find()
    res.send({ data: order });
}

exports.getById = async (req, res) => {
    const order = await orders.findById(req.params.id);
    res.send(order)
}

exports.updateOrder = async (req, res) => {
    try {
        const updatedOrder = await orders.findByIdAndUpdate(
            req.params.id,
            { delStatus: req.body.delStatus }, // Update the delStatus field with the new value
            { new: true } // Return the updated order after the update is applied
        );

        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json(updatedOrder);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.delOrder = async (req, res) => {
    const deleted = await orders.findByIdAndDelete(req.params.id)
    res.send(deleted)
}


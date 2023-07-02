const orders = require('../Models/orders');

exports.createOrder = async (req, res) => {
    console.log(req.body)
    const { productName, userId, sellerId, productId, qty, shippingAdress, delStatus, date } = req.body;
    const order = new orders({ productName, userId, sellerId, productId, qty, shippingAdress, delStatus, date });
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


// Get all orders for a selected user ID
exports.getUserOrders = async (req, res) => {
    try {
        const userId = req.params.id;
        const userOrders = await orders.find({ userId }).populate('_id');
        res.json(userOrders);
    } catch (error) {
        console.error('Error fetching user orders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//-----------------------------------------------------------------------------------------------------
exports.updateCheckRate = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const { checkRate } = req.body;

        // Update the checkRate field of the order in your database using Mongoose or any other ORM
        const order = await orders.findByIdAndUpdate(orderId, { checkRate });

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        return res.status(200).json({ message: 'Rate added successfully' });
    } catch (error) {
        console.error('Error updating checkRate:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};



//Get All orders for selected seller by id 
exports.getAllSellerOrders = async (req, res) => {
    try {
        const sellerId = req.params.sellerId;
        const sellerOrders = await orders.find({ sellerId }).populate('userId');
        res.json({ data: sellerOrders });
    } catch (error) {
        console.error('Error fetching seller orders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const orders = require('../Models/orders');
const User = require('../Models/Users');
const Product = require('../Models/products');
exports.createOrder = async (req, res) => {
    console.log(req.body);
    const { productName, userId, sellerId, phoneNumber, productId, qty, shippingAddress, delStatus, date } = req.body;
    const order = new orders({ productName, userId, sellerId, phoneNumber, productId, qty, shippingAddress, delStatus, date });
    const savedOrder = await order.save();
    res.status(201).json({ savedOrder, status: 201 });
};


exports.createOrderApp = async (req, res) => {
    try {
        const { products, userId, phoneNumber, shippingAddress, delStatus, date } = req.body;
        const orderProducts = [];

        for (const product of products) {
            const { productId, qty } = product;

            const foundProduct = await Product.findById(productId)
            if (!foundProduct) {
                throw new Error(`Product not found with ID: ${productId}`);
            }

            const sellerId = foundProduct.seller;
            console.log(sellerId)
            const orderProduct = {
                productName: foundProduct.name,
                productId: foundProduct._id,
                price: foundProduct.price,
                qty: qty,
                sellerId: sellerId,
            };

            orderProducts.push(orderProduct);
        }

        const order = new orders({
            userId,
            sellerId: orderProducts[0].sellerId, // Assuming all products have the same sellerId, you can modify this accordingly
            phoneNumber,
            shippingAddress,
            delStatus,
            date,
            products: orderProducts,
        });

        const savedOrder = await order.save();

        res.status(201).json({ savedOrder, status: 201 });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
};

// Other controller methods for orders can be defined here

// Example of getting orders by user ID
exports.getOrdersByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find orders by user ID
        const orders = await Order.find({ userId });

        res.status(200).json({ orders });
    } catch (error) {
        console.error('Error retrieving orders:', error);
        res.status(500).json({ error: 'Failed to retrieve orders' });
    }
};

// Example of updating order delivery status
exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { delStatus } = req.body;

        // Find the order by ID and update the delivery status
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { delStatus }, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json({ updatedOrder });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ error: 'Failed to update order status' });
    }
};

// Example of deleting an order
exports.deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        // Find the order by ID and delete it
        const deletedOrder = await Order.findByIdAndDelete(orderId);

        if (!deletedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ error: 'Failed to delete order' });
    }
};

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
        const productId = req.params.productId;
        const { checkRate } = req.body;

        // Update the checkRate field of the product in any order
        const order = await orders.findOneAndUpdate(
            { 'products.productId': productId },
            { $set: { 'products.$.checkRate': checkRate } },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ error: 'Product not found in any order' });
        }

        return res.status(200).json({ message: 'Rate added successfully' });
    } catch (error) {
        console.error('Error updating checkRate:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};




//---------------------------------------------------------------------------------------
// Get all orders for selected seller by sellerId
exports.getAllSellerOrders = async (req, res) => {
    try {
        const sellerId = req.params.sellerId;

        // Find seller by sellerId
        const seller = await User.findOne({ _id: sellerId });

        if (!seller) {
            return res.status(404).json({ error: 'Seller not found.' });
        }

        // Find orders for the selected sellerId
        const sellerOrders = await orders.find({ sellerId });

        // Fetch user and product details for each order
        const ordersWithUserAndProductDetails = await Promise.all(sellerOrders.map(async (order) => {
            const productIds = order.products.map(product => product.productId);
            const userId = order.userId;

            // Find user details by userId
            const user = await User.findById(userId);

            // Check if user exists
            if (!user) {
                // Handle the case where user is not found
                console.error(`User not found for userId: ${userId}`);
                return null; // Skip this order and continue to the next iteration
            }

            // Find product details by productIds
            const products = await Product.find({ _id: { $in: productIds } });

            const orderWithProductDetails = {
                _id: order._id,
                user: {
                    userId: userId,
                    email: user.email,
                    name: user.name,
                    // Include other user details if needed
                },
                products: order.products.map(product => {
                    const matchingProduct = products.find(p => p._id.equals(product.productId));
                    return {
                        productId: product.productId,
                        name: matchingProduct ? matchingProduct.name : null,
                        price: matchingProduct ? matchingProduct.price : null,
                        qty: product.qty,
                        // Include other product details if needed
                    };
                }),
                phoneNumber: order.phoneNumber,
                shippingAddress: order.shippingAddress,
                delStatus: order.delStatus,
                date: order.date,
                checkRate: order.checkRate,
                seller: {
                    sellerId: seller._id,
                    name: seller.name,
                    email: seller.email,
                    // Include other seller details if needed
                }
            };

            return orderWithProductDetails;
        }));

        // Filter out any null orders (where user was not found)
        const validOrders = ordersWithUserAndProductDetails.filter(order => order !== null);

        res.json({ data: validOrders });
    } catch (error) {
        console.error('Error fetching seller orders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

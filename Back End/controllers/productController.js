const products = require('../Models/products')


exports.addProduct = (req, res) => {
    const {name,price,description,category,stock,image,reviews,seller}= req.body
    const product = new products({name,price,description,category,stock,image,reviews,seller})
    product.save().then(product=> {
        res.status(201).json(product)
    }).catch(err=> {
        res.send(err)
    })
}


//Get all products
exports.getAllProducts = async (req,res) => {
    const product = await products.find()
    res.send(product);
}


//Get product by it`s id
exports.getById = async (req,res) => {
    const product = await products.findById(req.params.id);
    res.send(product)
}


//Update existing product
exports.updateProduct = async (req,res) => {
    const update = await products.findByIdAndUpdate(req.params.id,req.body);
    res.send(update)
}

//Delete existing product by Id
exports.delProduct = async (req,res) => {
    const deleted = await products.findByIdAndDelete(req.params.id)
    res.send(deleted)
}

//Delete all products 
exports.delAllProducts = async (req,res) => {
    const deleted = await products.deleteMany()
    res.send(deleted)
}
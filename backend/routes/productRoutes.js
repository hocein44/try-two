const express = require('express');
const Product = require('../models/Product'); // Import Product Model

const router = express.Router();

// ✅ Create a New Product (POST)
router.post('/AddProduct', async (req, res) => {
    try {
        const { name, price,image, description, stock,category } = req.body;
        const newProduct = new Product({ name,price,image, description, stock,category });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Get All Products (GET)
router.get('/GetProducts', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});   





// ✅ Get a Single Product by ID (GET)
router.get('/GetProductById/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// ✅ Update a Product (PUT)
router.put('/UpdateProduct/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Delete a Product (DELETE)
router.delete('/DelProducts/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

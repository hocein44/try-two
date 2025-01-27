const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String },
    price: { type: Number },
    image: { type: String },
    description: { type: String },
    stock: { type: Number, default: 0 },
    category: { type: String },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;

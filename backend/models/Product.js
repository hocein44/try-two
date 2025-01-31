const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String },
    price: { type: Number },
    image: { type: String },
    description: { type: String },
    category: { type: String },
    code: { type: String }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;

const express = require('express');
const Product = require('../models/Product'); // Import Product Model
const PurchaseHistory = require('../models/PurchaseHistory');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();


// Ensure the 'uploads' folder exists or create it
const uploadDirectory = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

// Set storage for Multer with sanitized file names
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory); // Save to 'uploads/' directory
  },
  filename: (req, file, cb) => {
    // Sanitize the file name (remove special characters)
    const sanitizedFileName = file.originalname.replace(/\s+/g, '_').replace(/[^\w.-]/g, '');
    const timestamp = Date.now();
    cb(null, `${timestamp}-${sanitizedFileName}`);
  }
});

// Initialize Multer for file upload
const upload = multer({ storage });

// POST route to add a new product
router.post('/AddProduct', upload.single('image'), (req, res) => {
  const { name, price, description, stock ,category,code} = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : '';

  // Create a new product
  const newProduct = new Product({
    name,
    price,
    description,
    stock,
    image: imagePath,
    category,
    code
  });

  newProduct.save()
    .then(product => res.status(201).json(product))
    .catch(err => res.status(500).json({ error: err.message }));
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
router.put('/UpdateProduct/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, price, description, stock ,category,code} = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : req.body.image; // Use old image if not updating

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description, stock, image: imagePath,category,code},
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
function validatePayment(paymentInfo) {
  return paymentInfo.cardNumber && paymentInfo.expiry && paymentInfo.cvv;
}

router.post('/process-payment', async (req, res) => {
  try {
      const { productId, paymentInfo, userId } = req.body;

      if (!validatePayment(paymentInfo)) {
          return res.status(400).json({ message: 'Invalid payment details' });
      }

      // Find the available gift card
      const availableCard = await Product.findOne({ _id: productId });

      if (!availableCard) {
          return res.status(400).json({ message: 'Gift card out of stock' });
      }

      const cardCode = availableCard.code;
      const productName = availableCard.name;
      const price = availableCard.price; // Get the card price

      // Remove the purchased card from the database
      await Product.deleteOne({ _id: productId });

      // Save purchase history
      const newPurchase = new PurchaseHistory({
          userId,
          productName,
          cardCode,
          price // Store the price
      });

      await newPurchase.save();

      res.status(200).json({ message: 'Payment successful', cardCode, price });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});
router.get('/purchase-history/:userId', async (req, res) => {
  try {
      const userId = req.params.userId;
      const purchases = await PurchaseHistory.find({ userId });

      if (!purchases.length) {
          return res.status(404).json({ message: 'No purchase history found' });
      }

      res.status(200).json(purchases);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


module.exports = router;

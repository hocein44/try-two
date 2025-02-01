// Backend: Payment Processing (routes/paymentRoutes.js)
const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Simulated payment validation function
function validatePayment(paymentInfo) {
    return paymentInfo.cardNumber && paymentInfo.expiry && paymentInfo.cvv;
}

// Process Payment and Provide Gift Code
router.post('/process-payment', async (req, res) => {
    try {
        const { productId, quantity, paymentInfo } = req.body;
        
        if (!validatePayment(paymentInfo)) {
            return res.status(400).json({ message: 'Invalid payment details' });
        }
        
        const availableCards = await Product.find({ _id: productId }).limit(quantity);
        
        if (availableCards.length < quantity) {
            return res.status(400).json({ message: 'Not enough stock available' });
        }
        
        const cardCodes = availableCards.map(card => card.code);
        
        await Product.deleteMany({ _id: { $in: availableCards.map(card => card._id) } });
        
        res.status(200).json({ message: 'Payment successful', cardCodes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

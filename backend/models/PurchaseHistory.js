const mongoose = require('mongoose');

const PurchaseHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Store user's ID
  productName: { type: String, required: true },
  cardCode: { type: String, required: true },
  price: { type: Number, required: true }, // Store the price of the purchased card
  purchasedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PurchaseHistory', PurchaseHistorySchema);

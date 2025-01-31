const express = require('express');
require('dotenv').config(); 
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Use the secret key from .env
const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
  try {
    const { items } = req.body; // Get the items that the user selected to buy

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(item => ({
        price_data: {
          currency: 'usd',  // Set to your currency
          product_data: {
            name: item.name,
          },
          unit_amount: item.price*100,  // Stripe expects amount in cents
        },
        quantity: item.quantity, // Quantity selected by user
      })),
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

const express = require("express");
const stripe = require("stripe")("sk_test_51PPlr2RrF58wXDtVNs3UhUVEZc6SNr23oKko0eh5hRio52lXQx9S4Q8DSC6PbRW2jzlGaB8Hc7AIgbg958e1gVYm00wDjUmJac");

const router = express.Router();

// Endpoint to create a PaymentIntent
router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: "Failed to create payment intent." });
  }
});

router.post("/confirm-payment-intent", async (req, res) => {
  try {
    const { paymentIntentId } = req.body;
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    await stripe.paymentIntents.update(paymentIntentId, {
      status: "succeeded",
    });

    res.status(200).send({ message: "Payment confirmed successfully." });
  } catch (error) {
    console.error("Error confirming payment:", error);
    res.status(500).json({ error: "Failed to confirm payment." });
  }
});

module.exports = router;

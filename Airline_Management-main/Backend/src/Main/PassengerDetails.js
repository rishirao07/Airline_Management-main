const express = require("express");
const collection = require("../Config/PassengerDetailsdb");

const router = express.Router();

router.post("/passenger-details", (req, res) => {
  const passengers = req.body;

  Promise.all(passengers.map(passenger => {
    const { firstName, lastName, email, mobile } = passenger;

    const newPassenger = new collection({
      firstname: firstName,
      lastname: lastName,
      email: email,
      mobile: mobile
    });

    return newPassenger.save();
  }))
  .then(() => {
    res.status(200).json({ message: "Passenger details saved successfully." });
  })
  .catch((err) => {
    console.error("Error saving passenger details:", err);
    res.status(500).json({ message: "An error occurred while saving passenger details." });
  });
});

module.exports = router;

const express = require("express");
const bcrypt = require("bcrypt");
const collection = require("../Config/signIndb");

const router = express.Router();

// Sign Up Route
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await collection.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already chosen" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new collection({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: "User created successfully", user: { name, email } });
    } catch (error) {
        res.status(500).json({ message: "Error creating user" });
    }
});

// Sign In Route
router.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await collection.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            res.status(200).json({ message: "Sign-in successful", user: { name: user.name, email: user.email } });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error signing in" });
    }
});

module.exports = router;

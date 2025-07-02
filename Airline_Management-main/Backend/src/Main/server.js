const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import route handlers
const authRoutes = require('./signIn');
const passengerRoutes = require('./PassengerDetails');
const paymentRoutes = require('./Payment');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api', passengerRoutes);
app.use('/api', paymentRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

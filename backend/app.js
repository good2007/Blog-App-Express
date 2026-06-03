// Load our hidden environment variables early
require('dotenv').config();
const express = require('express');
const connectDB = require('./server/config/db');
const app = express();
const PORT = process.env.PORT || 5000;
// Trigger our database connection function
connectDB();
// Built-in middleware to let our app read incoming JSON form data easily
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Set up a simple test route to ensure our server responds
app.get('/', (req, res) => {
 res.send("Our Express Server is online and active!");
});
app.listen(PORT, () => {
 console.log(`Server is running smoothly on local port: ${PORT}`);
});

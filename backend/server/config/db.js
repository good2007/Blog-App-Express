const mongoose = require('mongoose');
/**
 * An asynchronous function that attempts to log into our remote cloud database.
 * 'async' and 'await' are used because connecting across the internet takes
time.
 */
const connectDB = async () => {
 try {
 // Prepare Mongoose configuration preferences
 mongoose.set('strictQuery', false);
 // Tell Mongoose to dial the cloud URL hidden inside our .env file
 const conn = await mongoose.connect(process.env.MONGODB_URI);
 console.log("====================================================");
 console.log(" DATABASE CONNECTED SUCCESSFULLY! ");
 console.log(` Connected to cluster host: ${conn.connection.host}`);
 console.log("====================================================");
 } catch (error) {
 // If something goes wrong (like a wrong password), catch the error here
 console.error(`DATABASE CONNECTION FAILED: ${error.message}`);
 // Stop the server application immediately
 process.exit(1);
 }
};
module.exports = connectDB;

import mongoose from 'mongoose'

// Function to establish connection with MongoDB
// Separated into its own file so it can be reused and kept clean
const connectDB = async () => {
    try {
        // mongoose.connect() returns a connection object (promise-based)
        // We use await because DB connection is an async operation
        const connectInstances = await mongoose.connect(`${process.env.MONGODB_URI}`);

        // Log successful connection with DB host info (useful for debugging)
        console.log(
            `DATABASE HAS BEEN CONNECTED SUCCESSFULLY !! DB HOST : ${connectInstances.connection.host}`
        );
    } 
    catch (error) {
        // If DB connection fails, log error clearly
        console.error(`FAILED CONNECTION`, error);

        // Exit process immediately because app should not run without DB
        process.exit(1);
    }
};

// Export function so it can be used in server.js
export default connectDB;
const mongoose = require('mongoose');



const connectDB = async () => {

    mongoose.connection.on('connected', () => {
        console.log('MongoDB connected');
    });


    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/multitenant');
    } catch (err) {
        console.error('MongoDB connection error', err);
        process.exit(1);
    }
};






module.exports = connectDB;
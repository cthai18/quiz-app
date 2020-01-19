const mongoose = require('mongoose');

const uri = process.env.ATLAS_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
        console.log("MongoDB connected!");
    } catch(err) {
        console.error("Error: " + err.message);
        process.exit(1);
    }
}

module.exports = connectDB;
const mongoose = require("mongoose");

require("dotenv").config();

const connectDB = async () => {
  try {
    const uri = 'mongodb://localhost:27017/dashboardapp';
    const conn = await mongoose.connect(uri, {
      // useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    });
    console.log("MONGODB_URI:", process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

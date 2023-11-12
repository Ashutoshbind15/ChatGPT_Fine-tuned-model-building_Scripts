import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ DB Connected");
  } catch (error) {
    console.log("❌ DB Connection Error", error);
  }
};

export default connectDB;

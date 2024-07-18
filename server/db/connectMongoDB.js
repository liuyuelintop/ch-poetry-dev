import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
      console.log(`MongoDB connected successfully!`);
    });
  } catch (error) {
    console.error("Error connection to mongDB: ${error.message");
    process.exit(1);
  }
};
export default connectMongoDB;

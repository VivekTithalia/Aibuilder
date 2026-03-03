import mongoose from "mongoose";

const Connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected to database");
  } catch (error) {
    console.error("CRITICAL: Database connection failed!");
    console.error(error);
    process.exit(1);
  }
};
export default Connectdb;

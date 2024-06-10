import mongoose from "mongoose";

const CONNECT_STRING = process.env.MONGO_CONNECTION_STRING as string;

const connectToMongoDB = () => {
  try {
    mongoose
      .connect(CONNECT_STRING)
      .then(() => console.log("Connected to MongoDB: ", CONNECT_STRING));
  } catch (error) {
    console.log("Error while connecting to MongoDB", error);
  }
};
export default connectToMongoDB;

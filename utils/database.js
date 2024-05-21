import mongoose from "mongoose";

const dbOptions = {
  dbName: "share_prompt",
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Track connection status
let isConnected = false;

export const connectToDb = async () => {
  // If already connected, no need to reconnect
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, dbOptions);
    isConnected = true;
    console.log("MongoDB is connected");

    // Handle disconnection
    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
      isConnected = false;
    });

    // Close connection when the process is terminated
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("MongoDB connection closed due to app termination");
      process.exit(0);
    });
  } catch (err) {
    console.log("MongoDB connection error: ", err.message);
  }
};

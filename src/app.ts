import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./routes";

const app = express();

dotenv.config();
const port = process.env.PORT || 3001;
const mongoUri = process.env.MONGODB;

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connection successful");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process with failure
  }
};

connectToMongoDB();

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Add this line to parse URL-encoded data

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Express server is listening at http://localhost:${port} 🚀`);
});

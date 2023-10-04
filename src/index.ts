import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import router from "./router";
import dotenv from "dotenv";
import path from "path";

const envPath = path.resolve(__dirname, "../.env");

dotenv.config({ path: envPath });

const port = process.env.PORT || 3030;
const mongodbUri =
  process.env.MONGODB_URI || "mongodb://localhost:27017/mydatabase";

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(compression());
app.use(cookieParser());

app.use("/", router());

mongoose.Promise = global.Promise;
mongoose.connect(mongodbUri);

const db = mongoose.connection;

db.once("open", () => {
  console.log("App is successfully connected to MongoDB!");
});

db.on("error", (error) => {
  console.error("MongoDB Connection Error:");
  console.error(error);
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected.");
});

server.listen(port, () => {
  console.log(`server is running on PORT: ${port}`);
});

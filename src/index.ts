import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import router from "./router";

const app = express();
const server = http.createServer(app);
const mongodb_uri =
  "mongodb+srv://RomulanXY:Olly123@rest-api-cluster.e54nusn.mongodb.net/?retryWrites=true&w=majority";

app.use(
  cors({
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(compression());
app.use(cookieParser());

app.use("/", router());

mongoose.Promise = Promise;
mongoose.connect(mongodb_uri);
mongoose.connection.on("connection", (stream) => {
  console.log(stream);
  console.log("App is successfully connected to MongoDB!");
});
mongoose.connection.on("error", (error: Error) => console.log(error.message));

server.listen(4000, () => {
  console.log(`server is running on PORT: 4000`);
});

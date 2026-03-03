import express from "express";
import env from "dotenv";
import Connectdb from "./config/connection.js";
import authroutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
env.config();
const port = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

//routes
app.use("/api/auth", authroutes);
app.listen(port, () => {
  Connectdb();
  console.log(`server runing on the port number ${port}`);
});

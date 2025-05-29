import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import cors from "cors";
require("dotenv").config();

let app = express();
// app.use(cors({ origin: true }));
app.use(
  cors({
    origin: true, // Chỉ định frontend được phép truy cập
    credentials: true, // Cho phép gửi cookie, session, token
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // Cho phép các phương thức HTTP
    allowedHeaders: ["Content-Type", "Authorization"], // Cho phép các header cụ thể
  })
);
// config app

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 6969;
app.listen(port, () => {
  // callback
  console.log("Backend Nodejs is running on the port : " + port);
});

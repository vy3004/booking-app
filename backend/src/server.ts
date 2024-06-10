import cors from "cors";
import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";

import connectToMongoDB from "./db/connectToMongoDB";
import initRoutes from "./routes";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

initRoutes(app);

connectToMongoDB();

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

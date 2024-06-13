import cors from "cors";
import path from "path";
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
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

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

connectToMongoDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

import { Express } from "express";

import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import hotelRoutes from "./hotel.routes";

const initRoutes = (app: Express) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/hotels", hotelRoutes);
};

export default initRoutes;

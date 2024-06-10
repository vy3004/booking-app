import { Express } from "express";

import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";

const initRoutes = (app: Express) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
};

export default initRoutes;

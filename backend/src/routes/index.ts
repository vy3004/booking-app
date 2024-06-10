import { Express } from "express";

import authRouter from "./auth.router";
import userRouter from "./user.router";

const initRoutes = (app: Express) => {
  app.use("/api/auth", authRouter);
  app.use("/api/users", userRouter);
};

export default initRoutes;

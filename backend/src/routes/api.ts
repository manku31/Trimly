import { Router } from "express";
import userRoutes from "./userRoutes";
import barberRoutes from "./barberRoutes";

const router = Router();

// Mount sub-routes
router.use("/users", userRoutes);
router.use("/barbers", barberRoutes);

export default router;

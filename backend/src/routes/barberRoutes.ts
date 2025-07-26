import { Router } from "express";
import { BarberController } from "../controllers/barberCpntroller";

const router = Router();
const barberController = new BarberController();

// API info endpoint
router.get("/", barberController.testFunc);

export default router;

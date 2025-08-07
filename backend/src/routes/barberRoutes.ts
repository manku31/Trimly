import { Router } from "express";
import { BarberController } from "../controllers/barberController";

const router = Router();
const barberController = new BarberController();

// API info endpoint
router.post("/create-barber", barberController.createBarber);
router.post("/create-shop", barberController.createShop);
router.post("/login", barberController.loginBarber);
// router.post("/refresh-token", barberController.refreshToken);

router.get("/barber-profile", barberController.getCurrentBarber);


export default router;

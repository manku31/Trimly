import { Router } from "express";
import { BarberController } from "../controllers/barberController";

const router = Router();
const barberController = new BarberController();

// Barber registration and verification
router.post("/create-barber", barberController.createBarber);
router.post("/verify-otp", barberController.verifyBarberOTP);
router.post("/resend-otp", barberController.resendBarberOTP);
router.post("/create-shop", barberController.createShop);

// Barber authentication
router.post("/login", barberController.loginBarber);
router.post("/refresh-token", barberController.refreshToken);

// Protected routes
router.get("/barber-profile", barberController.getCurrentBarber);

export default router;

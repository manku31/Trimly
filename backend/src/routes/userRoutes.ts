import { Router } from "express";
import { UserController } from "../controllers/userController";
import { authenticateToken } from "../middleware/authenticate";

const router = Router();
const userController = new UserController();

// User registration and verification
router.post("/create", userController.createUser);
router.post("/verify-otp", userController.verifyUserOtp);
router.post("/resend-otp", userController.resendOTP);

// User authentication
router.post("/login", userController.loginUser);
router.post("/refresh-token", userController.refreshToken);

// Protected routes
router.get("/profile", authenticateToken, userController.getCurrentUser);

export default router;

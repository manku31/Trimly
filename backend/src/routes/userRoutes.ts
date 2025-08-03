import { Router } from "express";
import { UserController } from "../controllers/userController";
import { authenticateToken } from "../middleware/authenticate";

const router = Router();
const userController = new UserController();

// API info endpoint
router.post("/create", userController.createUser);
router.post("/login", userController.loginUser);
router.post("/refresh-token", userController.refreshToken);

router.get("/profile", authenticateToken, userController.getCurrentUser);

export default router;
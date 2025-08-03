import { Router } from "express";
import { UserController } from "../controllers/userController";

const router = Router();
const userController = new UserController();

// API info endpoint
router.get("/", userController.testFunc);
router.post("/create", userController.createUser);
router.post("/login", userController.loginUser);

export default router;

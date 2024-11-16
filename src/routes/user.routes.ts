import { Router } from "express";
import UserController from "../controllers/user.controller";
import {
  authMiddleware,
  masterAuthMiddleware,
} from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", masterAuthMiddleware, UserController.register);
router.post("/login", UserController.login);
router.get("/:id", authMiddleware, UserController.getUser);
router.get("/", masterAuthMiddleware, UserController.getAllUsers);
router.post("/checkIsMaster", authMiddleware, UserController.checkIsMaster);

export default router;

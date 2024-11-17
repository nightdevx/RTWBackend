import { Router } from "express";
import * as EmailController from "../controllers/email.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/send", authMiddleware, EmailController.sendEmail);
router.post("/send-approval", authMiddleware, EmailController.sendApprovalEmail);

export default router;

import { Router } from "express";
import * as InterviewController from "../controllers/interview-data.controller";
import {authMiddleware} from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, InterviewController.createInterview);
router.get("/:id", InterviewController.getInterviewById);
router.get("/name/:name", InterviewController.getInterviewByName);
router.put("/:id", authMiddleware, InterviewController.updateInterview);
router.delete("/:id", authMiddleware, InterviewController.deleteInterview);
router.get("/", InterviewController.getAllInterviews);

export default router;

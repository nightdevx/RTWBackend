import { Router } from "express";
import userRoutes from "./user.routes";
import questionPackageRoutes from "./question-package.routes";
import applicationRoutes from "./application.routes";
import interviewDataRoutes from "./interview-data.routes";
import videoRoutes from "./video.routes";
import mailRoutes from "./mail-package.routes";
import emailRoutes from "./email.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/question-packages", questionPackageRoutes);
router.use("/application", applicationRoutes);
router.use("/interviews", interviewDataRoutes);
router.use("/videos", videoRoutes);
router.use("/mail-packages", mailRoutes);
router.use("/emails", emailRoutes);

export default router;

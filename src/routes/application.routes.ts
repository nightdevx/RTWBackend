import { Router } from "express";
import * as Application from "../controllers/application.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", Application.createApplication);
router.get("/", authMiddleware, Application.getAllApplication);
router.get("/:id", authMiddleware, Application.getApplicationById);
router.put("/:id", Application.updateApplication);
router.delete("/:id", authMiddleware, Application.deleteApplication);
router.get(
  "/interviews/:interviewId",
  authMiddleware,
  Application.getApplicationByInterviewId
);
router.post("/:id/notes", authMiddleware, Application.addNoteToApplication);
router.delete(
  "/:id/notes/:noteIndex",
  authMiddleware,
  Application.deleteNoteFromApplication
);
router.put(
  "/:id/notes/:noteIndex",
  authMiddleware,
  Application.updateNoteInApplication
);

export default router;

import { Router } from "express";
import {
  getVideos,
  uploadVideo,
  deleteVideo,
  getVideoById,
  getVideosByIds,
} from "../controllers/video.controller";
import multer from "multer";
import { authMiddleware } from "../middlewares/auth.middleware";

// Multer setup - Memory storage to keep files in memory, not on disk
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = Router();

router.get("/", getVideos);
router.get("/:id", getVideoById);
router.delete("/:id", authMiddleware, deleteVideo);
router.post("/", upload.single("video"), uploadVideo);
router.post("/multiple", getVideosByIds);

export default router;

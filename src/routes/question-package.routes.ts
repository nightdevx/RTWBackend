import { Router } from "express";
import * as QuestionPackageController from "../controllers/question-package.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/",
  authMiddleware,
  QuestionPackageController.createQuestionPackage
);
router.get("/", authMiddleware, QuestionPackageController.getQuestionPackages);
router.get("/:id", QuestionPackageController.getQuestionPackageById);
router.put(
  "/:id",
  authMiddleware,
  QuestionPackageController.updateQuestionPackage
);
router.delete(
  "/:id",
  authMiddleware,
  QuestionPackageController.deleteQuestionPackage
);
router.delete(
  "/",
  authMiddleware,
  QuestionPackageController.deleteQuestionPackages
);
router.put(
  "/add-question/:id",
  authMiddleware,
  QuestionPackageController.addQuestionToPackage
);
router.put(
  "/update-question/:packId/:questId",
  authMiddleware,
  QuestionPackageController.updateQuestionInPackage
);
router.patch(
  "/remove-question/:packId",
  authMiddleware,
  QuestionPackageController.removeQuestionsFromPackage
);

export default router;

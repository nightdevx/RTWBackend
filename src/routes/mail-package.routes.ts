import { Router } from "express";
import * as mailPackageController from "../controllers/mail-package.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

// Mail package
router.post("/", authMiddleware, mailPackageController.createMailPackage);
router.get("/:id", mailPackageController.getMailPackageById);
router.get(
  "/interview/:interviewId",
  mailPackageController.getMailPackagesByInterviewId
);
router.get("/", authMiddleware, mailPackageController.getAllMailPackages);
router.put("/:id", authMiddleware, mailPackageController.updateMailTemplate);
router.delete("/:id", authMiddleware, mailPackageController.deleteMailPackage);

// Mail in package
router.get("/mail/:id/:mail", mailPackageController.getMailDataByMail);
router.post(
  "/mail/:id",
  authMiddleware,
  mailPackageController.addMailsToPackage
);
router.put(
  "/mail/:id",
  authMiddleware,
  mailPackageController.updateMailInPackage
);
router.put("/mails/:id", mailPackageController.updateMailStatuses);
router.delete(
  "/mail/:id",
  authMiddleware,
  mailPackageController.deleteMailFromPackage
);
router.put("/mail/:id/:mail", mailPackageController.markInterviewAsDone);
router.put(
  "/approval-status/:id",
  authMiddleware,
  mailPackageController.updateApprovalStatus
);
export default router;

import { Request, Response } from "express";
import { Types } from "mongoose";
import * as mailPackageService from "../services/mail-package.service";

//Mail package controller
export const createMailPackage = async (req: Request, res: Response) => {
  try {
    const { interviewId, userMails } = req.body;
    const mail = await mailPackageService.createMailPackage(
      interviewId,
      userMails
    );
    res.status(201).json(mail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMailPackageById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const mail = await mailPackageService.getMailPackageById(id);
    if (!mail) {
      return res.status(404).json({ message: "Mail not found" });
    }
    res.status(200).json(mail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMailPackagesByInterviewId = async (
  req: Request,
  res: Response
) => {
  try {
    const { interviewId } = req.params;
    const mails = await mailPackageService.getMailsByInterviewId(interviewId);
    res.status(200).json(mails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllMailPackages = async (_req: Request, res: Response) => {
  try {
    const mails = await mailPackageService.getAllMails();
    res.status(200).json(mails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMailPackage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedMail = await mailPackageService.deleteMailPackage(id);
    if (!deletedMail) {
      return res.status(404).json({ message: "Mail not found" });
    }
    res.status(200).json({ message: "Mail deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMailTemplate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { template } = req.body;
    const updatedMail = await mailPackageService.updateMailTemplate(
      id,
      template
    );
    if (!updatedMail) {
      return res
        .status(404)
        .json({ message: "Mail package not found or template not updated" });
    }
    res.status(200).json({ message: "Mail template updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Mail
export const getMailDataByMail = async (req: Request, res: Response) => {
  try {
    const { id, mail } = req.params;
    console.log(id, mail);
    const mailData = await mailPackageService.getMailDataByMail(id, mail);

    res.status(200).json(mailData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addMailsToPackage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const newMails = req.body;
    const updatedMail = await mailPackageService.addMailsToPackage(
      id,
      newMails.mails
    );
    if (!updatedMail) {
      return res.status(404).json({ message: "Mail package not found" });
    }
    res.status(200).json({ message: "Mail added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMailInPackage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { oldMail, newMail } = req.body;
    const updatedMail = await mailPackageService.updateMailInPackage(
      id,
      oldMail,
      newMail
    );
    if (!updatedMail) {
      return res.status(404).json({ message: "Mail not found or not updated" });
    }
    res.status(200).json({ message: "Mail updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMailStatuses = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { mails } = req.body;
    const updatedMail = await mailPackageService.updateMailStatuses(id, mails);
    if (!updatedMail) {
      return res.status(404).json({ message: "Mail not found or not updated" });
    }
    res.status(200).json({ message: "Mail updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMailFromPackage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { mail } = req.body;
    const updatedMail = await mailPackageService.deleteMailFromPackage(
      id,
      mail
    );
    if (!updatedMail) {
      return res.status(404).json({ message: "Mail not found or not deleted" });
    }
    res.status(200).json({ message: "Mail deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const markInterviewAsDone = async (req: Request, res: Response) => {
  try {
    const { id, mail } = req.params;

    const updatedMail = await mailPackageService.markInterviewAsDone(id, mail);
    if (!updatedMail) {
      return res
        .status(404)
        .json({ message: "Mail not found or interview not marked as done" });
    }
    res.status(200).json({ message: "Interview marked as done successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

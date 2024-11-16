import { Request, Response } from "express";
import * as ApplicationService from "../services/application.service";

export const createApplication = async (req: Request, res: Response) => {
  try {
    const personalData = await ApplicationService.createApplication(req.body);
    res.status(201).json(personalData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getApplicationById = async (req: Request, res: Response) => {
  try {
    const personalInterviewDataById =
      await ApplicationService.getApplicationById(req.params.id);
    if (!personalInterviewDataById) {
      return res.status(404).json({ message: "Personal data not found" });
    }
    res.status(200).json(personalInterviewDataById);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getApplicationByInterviewId = async (
  req: Request,
  res: Response
) => {
  try {
    const personalData = await ApplicationService.getApplicationByInterviewId(
      req.params.interviewId
    );
    if (!personalData) {
      return res.status(404).json({ message: "Personal data not found" });
    }
    res.status(200).json(personalData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateApplication = async (req: Request, res: Response) => {
  try {
    const personalData = await ApplicationService.updateApplication(
      req.params.id,
      req.body
    );
    if (!personalData) {
      return res.status(404).json({ message: "Personal data not found" });
    }
    res.status(200).json(personalData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteApplication = async (req: Request, res: Response) => {
  try {
    const personalData = await ApplicationService.deleteApplication(
      req.params.id
    );
    if (!personalData) {
      return res.status(404).json({ message: "Personal data not found" });
    }
    res.status(200).json({ message: "Personal data deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllApplication = async (req: Request, res: Response) => {
  try {
    const personalDataList = await ApplicationService.getAllApplication();
    res.status(200).json(personalDataList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const addNoteToApplication = async (req: Request, res: Response) => {
  try {
    const updatedApplication = await ApplicationService.addNoteToApplication(
      req.params.id,
      req.body.note
    );
    if (!updatedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json(updatedApplication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateNoteInApplication = async (req: Request, res: Response) => {
  try {
    const updatedApplication = await ApplicationService.updateNoteInApplication(
      req.params.applicationId,
      req.params.noteId,
      req.body.note
    );
    if (!updatedApplication) {
      return res.status(404).json({ message: "Application or note not found" });
    }
    res.status(200).json(updatedApplication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteNoteFromApplication = async (
  req: Request,
  res: Response
) => {
  try {
    const updatedApplication =
      await ApplicationService.deleteNoteFromApplication(
        req.params.applicationId,
        req.params.noteId
      );
    if (!updatedApplication) {
      return res.status(404).json({ message: "Application or note not found" });
    }
    res.status(200).json(updatedApplication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

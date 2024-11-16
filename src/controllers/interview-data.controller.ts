import { Request, Response } from "express";
import * as InterviewService from "../services/interview-data.service";
import { IInterview } from "../models/interview.model";

export const createInterview = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const interviewData: Partial<IInterview> = req.body;
    const newInterview = await InterviewService.createInterview(interviewData);
    res.status(201).json({ message: "succeded", id: newInterview._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getInterviewById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const interview = await InterviewService.getInterviewById(id);
    if (!interview) {
      res.status(404).json({ message: "Interview not found" });
      return;
    }
    res.status(200).json(interview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getInterviewByName = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name } = req.params;
    const interview = await InterviewService.getInterviewByName(name);
    if (!interview) {
      res.status(404).json({ message: "Interview not found" });
      return;
    }
    res.status(200).json(interview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateInterview = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const interviewData: Partial<IInterview> = req.body;
    const updatedInterview = await InterviewService.updateInterview(
      id,
      interviewData
    );
    if (!updatedInterview) {
      res.status(404).json({ message: "Interview not found" });
      return;
    }
    res.status(200).json({ message: "succeded", id: updatedInterview._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteInterview = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedInterview = await InterviewService.deleteInterview(id);
    if (!deletedInterview) {
      res.status(404).json({ message: "Interview not found" });
      return;
    }
    res.status(200).json({ message: "Interview deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllInterviews = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const interviews = await InterviewService.getAllInterviews();
    res.status(200).json(interviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

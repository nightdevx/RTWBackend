import InterviewData, { IInterview } from "../models/interview.model";
import { Types } from "mongoose";

export const createInterview = async (
  data: Partial<IInterview>
): Promise<IInterview> => {
  const interview = new InterviewData(data);
  return await interview.save();
};

export const getInterviewById = async (
  id: string
): Promise<IInterview | null> => {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ID format");
  }
  return await InterviewData.findById(id).populate("packages").exec();
};

export const getInterviewByName = async (
  interviewName: string
): Promise<IInterview> => {
  return await InterviewData.findOne({ title: interviewName })
    .populate("packages")
    .exec();
};

export const updateInterview = async (
  id: string,
  data: Partial<IInterview>
): Promise<IInterview | null> => {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ID format");
  }
  return await InterviewData.findByIdAndUpdate(id, data, { new: true }).exec();
};

export const deleteInterview = async (
  id: string
): Promise<IInterview | null> => {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ID format");
  }
  return await InterviewData.findByIdAndDelete(id).exec();
};

export const getAllInterviews = async (): Promise<IInterview[]> => {
  return await InterviewData.find().populate("packages").exec();
};

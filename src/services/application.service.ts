import Application from "../models/application.model";
import { IApplication } from "../models/application.model";

const createApplication = async (data: IApplication): Promise<IApplication> => {
  const application = new Application(data);
  return await application.save();
};

const getApplicationById = async (id: string): Promise<IApplication | null> => {
  return await Application.findById(id).exec();
};

const getApplicationByInterviewId = async (
  interviewId: string
): Promise<IApplication[]> => {
  return await Application.find({ interviewId }).exec();
};

const updateApplication = async (
  id: string,
  data: Partial<IApplication>
): Promise<IApplication | null> => {
  return await Application.findByIdAndUpdate(id, data, {
    new: true,
  }).exec();
};

const deleteApplication = async (id: string): Promise<IApplication | null> => {
  return await Application.findByIdAndDelete(id).exec();
};

const getAllApplication = async (): Promise<IApplication[]> => {
  return await Application.find().exec();
};

const addNoteToApplication = async (
  id: string,
  note: string
): Promise<IApplication | null> => {
  return await Application.findByIdAndUpdate(
    id,
    { $push: { notes: { note, createdAt: new Date() } } },
    { new: true }
  ).exec();
};

const updateNoteInApplication = async (
  applicationId: string,
  noteId: string,
  newNote: string
): Promise<IApplication | null> => {
  return await Application.findOneAndUpdate(
    { _id: applicationId, "notes._id": noteId },
    { $set: { "notes.$.note": newNote, "notes.$.createdAt": new Date() } },
    { new: true }
  ).exec();
};

const deleteNoteFromApplication = async (
  applicationId: string,
  noteId: string
): Promise<IApplication | null> => {
  return await Application.findByIdAndUpdate(
    applicationId,
    { $pull: { notes: { _id: noteId } } },
    { new: true }
  ).exec();
};

export {
  createApplication,
  getApplicationById,
  updateApplication,
  deleteApplication,
  getAllApplication,
  getApplicationByInterviewId,
  addNoteToApplication,
  updateNoteInApplication,
  deleteNoteFromApplication,
};

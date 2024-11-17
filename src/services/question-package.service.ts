import {
  IQuestionPackage,
  QuestionPackage,
} from "../models/question-package.model";

// Create a new QuestionPackage
export const createQuestionPackage = async (
  data: IQuestionPackage
): Promise<IQuestionPackage> => {
  const questionPackage = new QuestionPackage(data);
  return await questionPackage.save();
};

// Get all QuestionPackages
export const getQuestionPackages = async (): Promise<IQuestionPackage[]> => {
  return await QuestionPackage.find().populate("questions");
};

// Get a single QuestionPackage by ID
export const getQuestionPackageById = async (
  id: string
): Promise<IQuestionPackage | null> => {
  return await QuestionPackage.findById(id).populate("questions");
};

// Update a QuestionPackage by ID
export const updateQuestionPackage = async (
  id: string,
  data: Partial<IQuestionPackage>
): Promise<IQuestionPackage | null> => {
  return await QuestionPackage.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

// Delete a QuestionPackage by ID
export const deleteQuestionPackage = async (
  id: string
): Promise<IQuestionPackage | null> => {
  return await QuestionPackage.findByIdAndDelete(id);
};

// Delete multiple QuestionPackages by IDs
export const deleteQuestionPackages = async (
  ids: string[]
): Promise<IQuestionPackage[]> => {
  const deletedPackages = await QuestionPackage.find({
    _id: { $in: ids },
  }).populate("questions");

  await QuestionPackage.deleteMany({ _id: { $in: ids } });

  return deletedPackages;
};

export const addQuestionToPackage = async (
  id: string,
  question: { questionText: string; questionTime: number }
): Promise<IQuestionPackage | null> => {
  return await QuestionPackage.findByIdAndUpdate(
    id,
    { $push: { questions: question } },
    { new: true, runValidators: true }
  ).populate("questions");
};

export const updateQuestionInPackage = async (
  packageId: string,
  questionId: string,
  updatedQuestion: { questionText: string; questionTime: number }
): Promise<IQuestionPackage | null> => {
  return await QuestionPackage.findOneAndUpdate(
    { _id: packageId, "questions._id": questionId },
    {
      $set: {
        "questions.$.questionText": updatedQuestion.questionText,
        "questions.$.questionTime": updatedQuestion.questionTime,
      },
    },
    { new: true, runValidators: true }
  ).populate("questions");
};

export const removeQuestionsFromPackage = async (
  id: string,
  questionIds: string[]
): Promise<IQuestionPackage | null> => {
  const result = await QuestionPackage.findByIdAndUpdate(
    id,
    { $pull: { questions: { _id: { $in: questionIds } } } },
    { new: true }
  ).populate("questions");

  return result;
};

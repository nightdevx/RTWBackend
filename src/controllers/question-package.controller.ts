import { Request, Response } from "express";
import * as QuestionPackService from "../services/question-package.service";

const handleError = (res: Response, error: any, statusCode: number = 500) => {
  res.status(statusCode).json({ message: error.message });
};

// Create a new QuestionPackage
export const createQuestionPackage = async (req: Request, res: Response) => {
  try {
    const questionPackage = await QuestionPackService.createQuestionPackage(
      req.body
    );
    res.status(201).json(questionPackage);
  } catch (error) {
    handleError(res, error, 400);
  }
};

// Get all QuestionPackages
export const getQuestionPackages = async (req: Request, res: Response) => {
  try {
    const questionPackages = await QuestionPackService.getQuestionPackages();
    res.status(200).json(questionPackages);
  } catch (error) {
    handleError(res, error);
  }
};

// Get a single QuestionPackage by ID
export const getQuestionPackageById = async (req: Request, res: Response) => {
  try {
    const questionPackage = await QuestionPackService.getQuestionPackageById(
      req.params.id
    );
    if (!questionPackage) {
      return res.status(404).json({ message: "QuestionPackage not found" });
    }
    res.status(200).json(questionPackage);
  } catch (error) {
    handleError(res, error);
  }
};

// Update a QuestionPackage by ID
export const updateQuestionPackage = async (req: Request, res: Response) => {
  try {
    const questionPackage = await QuestionPackService.updateQuestionPackage(
      req.params.id,
      req.body
    );
    if (!questionPackage) {
      return res.status(404).json({ message: "QuestionPackage not found" });
    }
    res.status(200).json(questionPackage);
  } catch (error) {
    handleError(res, error, 400);
  }
};

// Delete a QuestionPackage by ID
export const deleteQuestionPackage = async (req: Request, res: Response) => {
  try {
    const questionPackage = await QuestionPackService.deleteQuestionPackage(
      req.params.id
    );
    if (!questionPackage) {
      return res.status(404).json({ message: "QuestionPackage not found" });
    }
    res.status(200).json({ message: "QuestionPackage deleted successfully" });
  } catch (error) {
    handleError(res, error);
  }
};

// Delete multiple QuestionPackages by IDs
export const deleteQuestionPackages = async (req: Request, res: Response) => {
  try {
    const ids: string[] = req.body.ids;
    await QuestionPackService.deleteQuestionPackages(ids);
    res.status(200).json({
      message: "QuestionPackages deleted successfully",
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const addQuestionToPackage = async (req: Request, res: Response) => {
  try {
    const questionPackage = await QuestionPackService.addQuestionToPackage(
      req.params.id,
      req.body
    );
    if (!questionPackage) {
      return res.status(404).json({ message: "QuestionPackage not found" });
    }
    res.status(200).json(questionPackage);
  } catch (error) {
    handleError(res, error, 400);
  }
};

export const updateQuestionInPackage = async (req: Request, res: Response) => {
  try {
    const { packId, questId } = req.params;
    const updatedQuestion = req.body;
    const questionPackage = await QuestionPackService.updateQuestionInPackage(
      packId,
      questId,
      updatedQuestion
    );
    if (!questionPackage) {
      return res.status(404).json({ message: "QuestionPackage or Question not found" });
    }
    res.status(200).json(questionPackage);
  } catch (error) {
    handleError(res, error, 400);
  }
};

export const removeQuestionFromPackage = async (
  req: Request,
  res: Response
) => {
  try {
    const packId = req.params.packId;
    const questionId = req.params.questId;
    const questionPackage = await QuestionPackService.removeQuestionFromPackage(
      packId,
      questionId
    );
    if (!questionPackage) {
      return res.status(404).json({ message: "QuestionPackage not found" });
    }
    // const response = new GeneralResponseDto();
    res.status(200).json(questionPackage);
  } catch (error) {
    handleError(res, error, 400);
  }
};

// export class GeneralResponseDto{
//   success: boolean;
//   message: string;
//   data: any;
// }

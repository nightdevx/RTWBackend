import { Schema, model, Document } from "mongoose";

interface IQuestionPackage extends Document {
  title: string;
  questions: {
    questionText: string;
    questionTime: number;
  }[];
}

const questionPackageSchema = new Schema<IQuestionPackage>(
  {
    title: { type: String, required: true },
    questions: [
      {
        questionText: { type: String, required: true },
        questionTime: { type: Number, required: true },
      },
    ],
  },
  {
    versionKey: false,
  }
);

const QuestionPackage = model<IQuestionPackage>(
  "QuestionPackage",
  questionPackageSchema
);

export { QuestionPackage, IQuestionPackage };

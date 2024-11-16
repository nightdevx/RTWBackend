import { Schema, model, Document } from "mongoose";
import MailPackage from "./mail-package.model";

export interface IInterview extends Document {
  title: string;
  packages: [];
  expireDate: Date;
  canSkip: boolean;
  showAtOnce: boolean;
  isActive?: boolean;
  applyCount?: number;
  waitingCount?: number;
}

const interviewDataSchema = new Schema<IInterview>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    packages: [
      {
        type: Schema.Types.ObjectId,
        ref: "QuestionPackage",
      },
    ],
    expireDate: {
      type: Date,
      required: true,
    },
    canSkip: {
      type: Boolean,
      required: true,
    },
    showAtOnce: {
      type: Boolean,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    applyCount: {
      type: Number,
      default: 0,
    },
    waitingCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

interviewDataSchema.post("save", async function (doc) {
  try {
    await MailPackage.create({
      interviewId: doc._id,
      userMails: [],
      template: {
        subject: doc.title,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

interviewDataSchema.pre("findOneAndDelete", async function (next) {
  try {
    MailPackage.findOneAndDelete({ interviewId: this.getFilter()._id }).exec();
    next();
  } catch (error) {
    console.log(error);
  }
});

const InterviewData = model<IInterview>("Interview", interviewDataSchema);

export default InterviewData;

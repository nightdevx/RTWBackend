import { Schema, model, Types } from "mongoose";
import InterviewData from "./interview.model"; // Import the Interview model

export interface IApplication {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isKVKKApproved: boolean;
  videoUrl: string;
  interviewId: Types.ObjectId;
  status?: string;
  questionData?: [
    {
      question: string;
      answerTime: number;
    }
  ];
  notes?: [
    {
      note: string;
    }
  ];
}

const applicationsSchema = new Schema<IApplication>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    videoUrl: { type: String, required: true },
    interviewId: {
      type: Schema.Types.ObjectId,
      ref: "Interview",
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "waiting",
    },
    isKVKKApproved: { type: Boolean, required: true },
    questionData: [
      {
        question: {
          type: String,
          required: true,
        },
        answerTime: { type: Number, required: true },
      },
    ],
    notes: [
      {
        note: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Bileşik indeks ekleyin
applicationsSchema.index({ interviewId: 1, email: 1 }, { unique: true });
applicationsSchema.index({ interviewId: 1, phone: 1 }, { unique: true });

// Middleware to increment waitingCount
applicationsSchema.post("save", async function (doc) {
  await InterviewData.findByIdAndUpdate(doc.interviewId, {
    $inc: { waitingCount: 1, applyCount: 1 },
  });
});

const PersonalInterviewData = model<IApplication>(
  "Applications",
  applicationsSchema
);

export default PersonalInterviewData;

import { Schema, model, Document, Types } from "mongoose";

interface IMailPackage extends Document {
  interviewId: Types.ObjectId;
  template?: {
    subject: string;
    text: string;
  };
  userMails: Array<{
    mail: string;
    mailStatus: string;
    interviewStatus: string;
  }>;
}

const mailPackageSchema = new Schema<IMailPackage>(
  {
    interviewId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    template: {
      subject: {
        type: String,
        default: "",
      },
      text: {
        type: String,
        default: "",
      },
    },
    userMails: [
      {
        mail: {
          type: String,
          required: true,
          default: "",
        },
        mailStatus: {
          type: String,
          required: true,
          default: "not-sended",
        },
        interviewStatus: {
          type: String,
          default: "not-done",
        },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const MailPackage = model<IMailPackage>("MailPackage", mailPackageSchema);

export default MailPackage;

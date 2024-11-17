import { Schema, model, Document, Types } from "mongoose";

interface IMailPackage extends Document {
  interviewId: Types.ObjectId;
  infoTemplate?: {
    subject: string;
    text: string;
  };
  acceptTemplate?: {
    subject: string;
    text: string;
  };
  rejectTemplate?: {
    subject: string;
    text: string;
  };
  userMails: Array<{
    mail: string;
    mailStatus: string;
    interviewStatus: string;
    approvalStatus: string;
  }>;
}

const mailPackageSchema = new Schema<IMailPackage>(
  {
    interviewId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    infoTemplate: {
      subject: {
        type: String,
        default: "",
      },
      text: {
        type: String,
        default: "",
      },
    },
    acceptTemplate: {
      subject: {
        type: String,
        default: "",
      },
      text: {
        type: String,
        default: "",
      },
    },
    rejectTemplate: {
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
        approvalStatus: {
          type: String,
          default: "waiting",
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

import Mail from "../models/mail-package.model";

//Mail package service
export const createMailPackage = async (
  interviewId: string,
  userMails: Array<{ mail: string; status?: string }>
) => {
  const mail = new Mail({
    interviewId,
    userMails: userMails.map((userMail) => ({
      mail: userMail.mail,
      status: userMail.status || "not-sended",
    })),
  });
  return await mail.save();
};

export const getMailPackageById = async (id: string) => {
  return await Mail.findById(id).populate({
    path: "interviewId",
    select: "title",
  });
};

export const getMailsByInterviewId = async (interviewId: string) => {
  try {
    return await Mail.find({ interviewId }).populate({
      path: "interviewId",
      select: "title",
      model: "Interview", // Ensure the correct model is being populated
    });
  } catch (error) {
    throw new Error(`Error fetching mails by interview ID: ${error.message}`);
  }
};

export const getAllMails = async () => {
  try {
    return await Mail.find().populate({
      path: "interviewId",
      select: "title",
      model: "Interview", // Ensure the correct model is being populated
    });
  } catch (error) {
    throw new Error(`Error fetching all mails: ${error.message}`);
  }
};

export const updateMailPackage = async (
  id: string,
  mail: string,
  status: string
) => {
  return await Mail.updateOne(
    { _id: id, "userMails.mail": mail },
    { $set: { "userMails.$.status": status } }
  );
};

export const deleteMailPackage = async (id: string) => {
  return await Mail.findByIdAndDelete(id);
};

export const updateMailTemplate = async (id: string, newTemplate: string) => {
  return await Mail.updateOne({ _id: id }, { $set: { template: newTemplate } });
};

//Mail service
export const getMailDataByMail = async (interviewId: string, mail: string) => {
  const mailPackage = await Mail.findOne(
    { interviewId, "userMails.mail": mail },
    { "userMails.$": 1 }
  );

  if (!mailPackage) {
    return null;
  }

  return mailPackage.userMails[0];
};

export const addMailsToPackage = async (
  id: string,
  newMails: Array<{
    mail: string;
    mailStatus?: string;
    interviewStatus?: string;
  }>
) => {
  if (newMails.length === 0) {
    throw new Error("No mails to add");
  }
  const validMails = newMails.filter((newMail) => newMail.mail !== "");
  if (validMails.length === 0) {
    throw new Error("No valid mails to add");
  }
  return await Mail.updateOne(
    { _id: id },
    {
      $push: {
        userMails: {
          $each: validMails.map((newMail) => ({
            mail: newMail.mail,
            mailStatus: newMail.mailStatus || "not-sended",
            interviewStatus: newMail.interviewStatus || "not-done",
          })),
        },
      },
    }
  );
};

export const updateMailInPackage = async (
  id: string,
  oldMail: string,
  newMail: { mail: string; mailStatus?: string; interviewStatus?: string }
) => {
  return await Mail.updateOne(
    { _id: id, "userMails.mail": oldMail },
    {
      $set: {
        "userMails.$.mail": newMail.mail,
        "userMails.$.mailStatus": newMail.mailStatus || "not-sended",
        "userMails.$.interviewStatus": newMail.interviewStatus || "not-sended",
      },
    }
  );
};

export const updateMailStatuses = async (
  id: string,
  mails: Array<{ mail: string; mailStatus: string }>
) => {
  const bulkOps = mails.map((mail) => ({
    updateOne: {
      filter: { _id: id, "userMails.mail": mail.mail },
      update: { $set: { "userMails.$.mailStatus": mail.mailStatus } },
    },
  }));

  return await Mail.bulkWrite(bulkOps);
};

export const deleteMailFromPackage = async (id: string, mail: string) => {
  return await Mail.updateOne({ _id: id }, { $pull: { userMails: { mail } } });
};

export const markInterviewAsDone = async (
  interviewId: string,
  mail: string
) => {
  console.log(interviewId, mail);
  return await Mail.updateOne(
    { interviewId, "userMails.mail": mail },
    { $set: { "userMails.$.interviewStatus": "done" } }
  );
};

import { Request, Response } from "express";
import * as emailService from "../services/email.service";

export const sendEmail = async (req: Request, res: Response) => {
  const { to, subject, message } = req.body;
  console.log("Sending email to:", to, subject, message);

  if (to.length === 0 || subject.trim() === "" || message.trim() === "") {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await emailService.sendMail({ to, subject, message });
    if (result) {
      return res.status(200).json({ message: "Email sent successfully" });
    } else {
      return res.status(500).json({ error: "Failed to send email" });
    }
  } catch (error) {
    console.error("Error in sendEmail controller:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const sendApprovalEmail = async (req: Request, res: Response) => {
  const { mails } = req.body;
  console.log("Sending approval email to:", mails);
  console.log("Mails:", mails.length);
  let allEmailsSent = true;
  for (let i = 0; i < mails.length; i++) {
      const to = mails[i].mail;
      const subject = mails[i].subject;
      const message = mails[i].text;
      console.log("Sending email to:", to, subject, message);
      try {
        const result = await emailService.sendMail({ to, subject, message });
        if (!result) {
          allEmailsSent = false;
        }
      } catch (error) {
        console.error("Error in sendEmail controller:", error);
        allEmailsSent = false;
      }
    }
    if (allEmailsSent) {
      return res.status(200).json({ message: "All emails sent successfully" });
    } else {
      return res.status(500).json({ error: "Failed to send some emails" });
    }
};

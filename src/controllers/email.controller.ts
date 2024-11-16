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

import nodemailer from "nodemailer";

interface ISendMail {
    to: string | string[];
    subject: string;
    message: string;
}

export const sendMail = async ({ to, subject, message }: ISendMail): Promise<boolean> => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: Array.isArray(to) ? to.join(",") : to,
        subject,
        html: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error("error sending email ", error);
        return false;
    }
};

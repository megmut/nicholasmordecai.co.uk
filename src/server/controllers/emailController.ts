import * as nodemailer from 'nodemailer';

export default class EmailController {
    public static sendEmail(from: string, subject: string, body: string, callback: Function) {
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.GMAILUSER,
                pass: process.env.GMAILAPPPASSWORD
            }
        });

        const mailOptions = {
            from: from,
            to: process.env.GMAILUSER,
            subject: subject,
            html: body
        };

        transporter.sendMail(mailOptions, callback);
    }
}
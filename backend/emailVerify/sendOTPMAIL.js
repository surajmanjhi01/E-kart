import nodemailer from 'nodemailer';
import 'dotenv/config';
export const sendOTPEmail = (otp, email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });
    const mailConfigurations = {

        // It should be a string of sender/server email
        from: 'process.env.MAIL_USER',

        to: email,

        // Subject of Email
        subject: 'Password reset OTP',
        html: `<p>Hi! There, You have recently requested for password reset. Please use the following OTP to reset your password:</p>
        <h1>${otp}</h1>
        <p>This OTP is valid for 10 minutes. If you did not request for password reset, please ignore this email.</p>
        <p>Thanks</p>`

        
    };

    transporter.sendMail(mailConfigurations, function (error, info) {
        if (error) throw Error(error);
        console.log('OTP Sent Successfully');
        console.log(info);
    });
}



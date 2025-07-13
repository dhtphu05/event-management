import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: 'dhtphu',
        pass: 'pass'
    }

})

export const sendResetPasswordEmail = async( email, resetLink)=>{
    try{
        const mailOptions={
            from: ``,
            to: email,
            subject: 'Yêu cầu đặt lại mật khẩu',
            html: `
                <h1>Đặt lại mật khẩu</h1>
                <a href="${resetLink}" ">
                    Nhấn vào link này để đặt lại mật khẩu
                </a>
            `
        }
        //send mail
        const info= await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return info;
    }
    catch(error){
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
}


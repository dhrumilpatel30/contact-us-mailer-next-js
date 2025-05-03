import nodemailer from 'nodemailer';
import { contactFormSchema } from './schema';
import type { z } from 'zod';

type ContactForm = z.infer<typeof contactFormSchema>;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

export async function sendMail(data: ContactForm) {
    const { name, email, mobile, merchantEmail, message, subject, formSource } = data;

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: merchantEmail,
        subject: subject,
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">New Contact Form Submission</h2>
            <p style="color: #666;"><small>From: ${formSource}</small></p>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
                <p><strong>Name:</strong> ${name}</p>
                ${email !== 'Not Provided' ? `<p><strong>Email:</strong> ${email}</p>` : ''}
                ${mobile !== 'Not Provided' ? `<p><strong>Mobile:</strong> ${mobile}</p>` : ''}
                ${message ? `
                <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #ddd;">
                    <strong>Message:</strong><br>
                    ${message}
                </div>` : ''}
            </div>
            <p style="color: #888; font-size: 12px; margin-top: 20px;">
                This email was sent automatically from your contact form system.
            </p>
        </div>
        `,
    };

    return transporter.sendMail(mailOptions);
} 
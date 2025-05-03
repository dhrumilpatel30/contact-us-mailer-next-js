import { z } from 'zod';

export const contactFormSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').optional(),
    email: z.string().email('Invalid email format').optional(),
    mobile: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format').optional(),
    merchantEmail: z.string().email('Invalid merchant email format'),
    message: z.string().optional(),
    subject: z.string().optional(),
    formSource: z.string().optional().default('Contact Form'), // To identify which form the submission came from
}).transform((data) => ({
    ...data,
    // Set defaults for optional fields
    name: data.name || 'Anonymous',
    email: data.email || 'Not Provided',
    mobile: data.mobile || 'Not Provided',
    subject: data.subject || `New Contact Form Submission from ${data.formSource}`,
}));
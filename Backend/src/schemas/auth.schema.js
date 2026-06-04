import { z } from 'zod';

export const registerSchema = z.object({
    fullName: z.string().trim().min(1, 'Full name is required'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['user', 'admin']).optional(),
    phone: z.string().regex(/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number').optional()
});

export const loginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(1, 'Password is required')
});

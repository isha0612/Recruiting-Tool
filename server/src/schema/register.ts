import { z } from 'zod';

export const registerSchema = z.object({
    password1: z.string().min(6),
    password2: z.string().min(6),
    email: z.string().email(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
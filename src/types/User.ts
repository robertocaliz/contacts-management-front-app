import { signupSchema } from '@/lib/schemas';
import { z } from 'zod';

export interface User extends z.infer<typeof signupSchema> {
    id: string;
    accessToken?: string;
    refreshToken?: string;
}

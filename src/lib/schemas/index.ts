import { RegEx } from '../../constants';
import z from 'zod';

export const usernameSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, '"username" é obrigatório.')
        .min(3, '"username" deve conter no mínimo 3 caracteres.')
        .max(60, '"usernamne" deve conter no máximo 60 caracteres.')
        .regex(
            RegEx.app.USERNAME,
            '"username" deve conter somente caracteres alfanuméricos.',
        ),
});

export const nameSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, '"nome" é obrigatório.')
        .min(3, '"nome" deve conter no mínimo 3 caracteres.')
        .max(60, '"nome" deve conter no máximo 60 caracteres.'),
});

export const emailSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, '"email" é obrigatório.')
        .email('"email" inválido.'),
});

export const emailSchemaOptional = z.object({
    email: z
        .string()
        .refine((value) => value === undefined || RegEx.app.EMAIL.test(value), {
            message: '"email" inválido.',
            path: ['email'],
        }),
});

export const MZPhoneNumberSchema = z.object({
    phoneNumber: z
        .string()
        .trim()
        .min(1, '"telefone" é obrigatório.')
        .regex(RegEx.app.PHONE_NUMBER, '"telefone" inválido.'),
});

export const passwordSchema = z.object({
    password: z
        .string()
        .trim()
        .min(1, '"password" é obrigatória.')
        .min(8, '"password" deve conter no mínimo 8 caracteres.')
        .max(72, '"password" deve conter no maximo 72 caracteres.'),
});

export const confirmPasswordSchema = z.object({
    confirmPassword: z
        .string()
        .trim()
        .min(1, '"password de confirmação" é obrigatória.'),
});

export const loginSchema = emailSchema.and(passwordSchema);

export const signupSchema = usernameSchema
    .and(loginSchema)
    .and(confirmPasswordSchema)
    .refine((data) => data.confirmPassword === data.password, {
        message: '"password de confirmação" deve ser igual a senha.',
        path: ['confirmPassword'],
    });

export const passwordsSchema = passwordSchema.and(confirmPasswordSchema);

export const recoveryTokenSchema = z.object({ recoveryToken: z.string() });

export const updatePasswordSchema = recoveryTokenSchema.and(passwordsSchema);

export const idSchema = z.object({
    _id: z.string(),
});

export const updateUserSignupSchema = idSchema
    .and(usernameSchema)
    .and(emailSchema);

export const contactSchema = nameSchema
    .and(emailSchemaOptional)
    .and(MZPhoneNumberSchema);

export const updateContactSchema = contactSchema.and(idSchema);

import { object, string } from 'yup';
import { RegEx } from '../../constants';

const usernameSchema = object({
    name: string()
        .trim()
        .required('"username" é obrigatório.')
        .min(3, '"username" deve conter no mínimo 3 caracteres.')
        .max(60, '"usernamne" deve conter no máximo 60 caracteres.')
        .matches(
            RegEx.app.USERNAME,
            '"username" deve conter somente caracteres alfanuméricos.',
        ),
});

const nameSchema = object({
    name: string()
        .trim()
        .required('"nome" é obrigatório.')
        .min(3, '"nome" deve conter no mínimo 3 caracteres.')
        .max(60, '"nome" deve conter no máximo 60 caracteres.'),
});

export const emailSchema = object({
    email: string()
        .trim()
        .required('"email" é obrigatório.')
        .matches(RegEx.app.EMAIL, '"email" inválido.'),
});

const emailSchemaOptional = object({
    email: string().optional().matches(RegEx.app.EMAIL, '"email" inválido.'),
});

const passwordSchema = object({
    password: string()
        .trim()
        .required('"password" é obrigatória.')
        .min(8, '"password" deve conter no mínimo 8 caracteres.')
        .max(72, '"password" deve conter no maximo 72 caracteres.'),
});

const confirmPasswordSchema = object({
    confirmPassword: string()
        .required('"password de confirmação" é obrigatória.')
        .test(
            'é igual a password de confirmação',
            '"password de confirmação" deve ser igual a senha.',
            (confirmPassword, textContext) =>
                confirmPassword === textContext.parent.password,
        ),
});

export const loginSchema = emailSchema.concat(passwordSchema);

export const signupSchema = usernameSchema
    .concat(loginSchema)
    .concat(confirmPasswordSchema);

export const updatePasswordSchema = passwordSchema.concat(
    confirmPasswordSchema,
);

export const updateUserSchema = usernameSchema.concat(emailSchemaOptional);

export const createContactSchema = nameSchema
    .concat(emailSchemaOptional)
    .shape({
        phoneNumber: string()
            .trim()
            .required('"telefone" é obrigatório.')
            .matches(RegEx.app.PHONE_NUMBER, '"telefone" inválido.'),
    });

export const updateContactSchema = createContactSchema;

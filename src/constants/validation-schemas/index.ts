import { object, string } from 'yup';
import { RegEx } from '..';



export const EMAIL_SCHEMA = object({
	email: string()
		.required('Email é obrigatório.')
		.min(8, 'Email deve conter no mínimo 8 caracteres.')
		.max(100, 'Email deve conter no máximo 100 caracteres.')
		.matches(RegEx.app.EMAIL, 'E-mail inválido.'),
});


const EMAIL_SCHEMA_OPTIONAL = object({
	email: string()
		.optional()
		.matches(RegEx.app.EMAIL, 'E-mail inválido.'),
});


const NAME_SCHEMA = object({
	name: string()
		.required('Nome é obrigatório.')
		.min(3, 'Nome deve conter no mínimo 3 caracteres.')
		.max(60, 'Nome deve conter no máximo 60 caracteres.'),
});



const PASSWORD_SCHEMA = object({
	password: string()
		.required('Senha é obrigatória.')
		.min(8, 'Senha deve conter no mínimo 8 caracteres.')
		.max(72, 'Senha deve conter no maximo 72 caracteres.')
});


export const LOGIN_SCHEMA = EMAIL_SCHEMA.concat(PASSWORD_SCHEMA);


const CONFIRM_PASSWORD_SCHEMA = object({
	confirmPassword: string()
		.required('A senha de confirmação é obrigatória.')
		.test(
			'É igual a senha',
			'A senha de confirmação deve ser igual a senha.',
			(confirmPassword, textContext) => {
				return textContext.parent.password === confirmPassword;
			})
});


export const SIGNUP_SCHEMA = LOGIN_SCHEMA
	.concat(CONFIRM_PASSWORD_SCHEMA)
	.concat(NAME_SCHEMA);



export const UPDATE_PASSWORD_SCHEMA = PASSWORD_SCHEMA.concat(CONFIRM_PASSWORD_SCHEMA);



export const CREATE_CONTACT_SCHEMA = NAME_SCHEMA.concat(EMAIL_SCHEMA_OPTIONAL).shape({
	phoneNumber: string()
		.required('Telefone é obrigatório.')
		.matches(RegEx.app.PHONE_NUMBER, 'Número de telefone inválido.')
});



export const UPDATE_USER_SCHEMA = NAME_SCHEMA.concat(EMAIL_SCHEMA_OPTIONAL);



export const UPDATE_CONTACT_SCHEMA = CREATE_CONTACT_SCHEMA;
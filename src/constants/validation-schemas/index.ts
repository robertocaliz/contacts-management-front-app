import { object, string } from 'yup';
import { RegEx } from '..';



const EMAIL_SCHEMA = object({
	email: string()
		.required('Email é obrigatório.')
		.min(8, 'Email deve conter no mínimo 8 caracteres.')
		.max(100, 'Email deve conter no máximo 100 caracteres.')
		.matches(RegEx.app.EMAIL, 'E-mail inválido.'),
});


const NAME_SCHEMA = object({
	name: string()
		.required('Nome é obrigatório.')
		.min(3, 'Nome deve conter no mínimo 3 caracteres.')
		.max(60, 'Nome deve conter no máximo 60 caracteres.'),
});


export const LOGIN_SCHEMA = EMAIL_SCHEMA.shape({
	password: string()
		.required('Senha é obrigatória.')
		.min(8, 'Senha deve conter no mínimo 8 caracteres.')
		.max(72, 'Senha deve conter no maximo 72 caracteres.')
});


export const SIGNUP_SCHEMA = LOGIN_SCHEMA.shape({
	confirmPassword: string()
		.required('A senha de confirmação é obrigatória.')
		.test(
			'É igual a senha',
			'A senha de confirmação deve ser igual a senha.',
			(confirmPassword, textContext) => {
				return textContext.parent.password === confirmPassword;
			})
}).concat(NAME_SCHEMA);



export const CREATE_CONTACT_SCHEMA = NAME_SCHEMA.concat(EMAIL_SCHEMA).shape({
	phoneNumber: string()
		.required('Telefone é obrigatório.')
		.matches(RegEx.app.PHONE_NUMBER, 'Número de telefone inválido.')
});



export const UPDATE_USER_SCHEMA = NAME_SCHEMA.concat(EMAIL_SCHEMA);



export const UPDATE_CONTACT_SCHEMA = CREATE_CONTACT_SCHEMA;
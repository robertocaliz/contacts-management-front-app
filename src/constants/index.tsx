import { object, string } from 'yup';



export const OPACITY_WHILE_LOADING_TRUE = 0.5;


export const OPACITY_WHILE_LOADING_FALSE = 1;


export const WAITING_TIME = 4000;



export const PUBLIC_ROUTES = [
	'/',
	'/login',
	'/signup'
];


export const RegEx = Object.freeze({
	app: {
		EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
		PHONE_NUMBER: /^(\\+258)?[28]\\d{8}$/
	}
});


const LOGIN_SCHEMA = object({
	email: string()
		.required('Email é obrigatório.')
		.min(8, 'Email deve conter no mínimo 8 caracteres.')
		.max(100, 'Email deve conter no máximo 100 caracteres.')
		.matches(RegEx.app.EMAIL, 'E-mail inválido.'),
	password: string()
		.required('Senha é obrigatória.')
		.min(8, 'Senha deve conter no mínimo 8 caracteres.')
		.max(72, 'Senha deve conter no maximo 72 caracteres.')

});


export const ValidationSchemas = Object.freeze({
	users: {
		SIGNUP: LOGIN_SCHEMA.shape({
			name: string()
				.required('Nome é obrigatório.')
				.min(3, 'Nome deve conter no mínimo 3 caracteres.')
				.max(60, 'Nome deve conter no máximo 60 caracteres.'),
			confirmPassword: string()
				.required('A senha de confirmação é obrigatória.')
				.test(
					'É igual a senha',
					'A senha de confirmação deve ser igual a senha.',
					(confirmPassword, textContext) => {
						return textContext.parent.password === confirmPassword;
					})
		}),
		LOGIN: LOGIN_SCHEMA
	}
});








export const WAITING_TIME = 4000;



export const PUBLIC_ROUTES = [
	'/',
	'/login',
	'/signup'
];


export const RegEx = Object.freeze({
	app: {
		EMAIL: /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})?$/,
		PHONE_NUMBER: /^(\\+258)?[28]\d{8}$/
	}
});



export const GLOBAL_ERROR_MESSAGE = `Ops, ocorreu um erro! 
					Tente novamente. Caso o erro persista, 
						contacte o suporte.`;


export const AXIOS_BASE_URL = 'http://localhost:5000';
export const PUBLIC_ROUTES = ['/', '/login', '/signup'];

export const RegEx = Object.freeze({
    app: {
        EMAIL: /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})?$/,
        PHONE_NUMBER: /^(\\+258)?[28]\d{8}$/,
        USERNAME: /^[a-zA-Z0-9]+$/,
    },
});

export const DEFAULT_SERVER_ERROR = 'Ops, ocorreu um erro!';

export const INTERNET_CONECTION_ERROR =
    'Não foi possível se conectar ao ContactsPro. Por favor, verifique sua conexão.';

export const INVALID_CREADENTIALS_ERROR = `Email ou senha inválida. 
Verifique as suas credênciais e tente novamente.`;

export const INACTIVE_ACCOUNT_ERROR = `Sua conta encontra-se inactiva.
Acesse o seu e-mail para ativar a sua conta
atravez do email que acabamos de enviar.`;

export const TWENTY_SECONDS = 20;

export const TWO_SECONDS = 2000;

export const ONE_SECOND = 1000;

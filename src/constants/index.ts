export const PUBLIC_ROUTES = ['/', '/login', '/signup'];

export const RegEx = Object.freeze({
    app: {
        EMAIL: /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})?$/,
        PHONE_NUMBER: /^(\\+258)?[28]\d{8}$/,
        USERNAME: /^[a-zA-Z0-9]+$/,
    },
});

export const GLOBAL_ERROR_MESSAGE = `Ops, ocorreu um erro!`;

export const TWENTY_SECONDS = 20;

export const TWO_SECONDS = 2000;

export const ONE_SECOND = 1000;

/* eslint-disable @typescript-eslint/no-explicit-any */

import { SignInError } from '@/types';
import { StatusCodes } from 'http-status-codes';
import { FieldError } from '@/types';

export class APPError extends Error {
    public status: number;
    public constructor(
        status: number = StatusCodes.INTERNAL_SERVER_ERROR,
        message?: string,
    ) {
        super(message);
        this.status = status;
    }
}

export class UnauthorizedError extends APPError {
    public constructor(message?: string) {
        super(StatusCodes.UNAUTHORIZED, message);
        this.name = 'UnauthorizedError';
    }
}

export class InvalidCredentialsError extends UnauthorizedError {
    public constructor({
        content,
        invalidCredentialsError = true,
    }: SignInError) {
        super(JSON.stringify({ content, invalidCredentialsError }));
        this.name = 'InvalidCredentialsError';
    }
}

export class NotFoundError extends APPError {
    public constructor(message?: string) {
        super(StatusCodes.NOT_FOUND, message);
        this.name = 'NotFoundError';
    }
}

export class ConflictError extends APPError {
    public errors: Array<FieldError>;
    public constructor(errors: Array<FieldError>) {
        super(StatusCodes.CONFLICT, undefined);
        this.errors = errors;
        this.name = 'ConflictError';
    }
}

export class ForbiddenError extends APPError {
    public constructor(message?: string) {
        super(StatusCodes.FORBIDDEN, message);
        this.name = 'ForbiddenError';
    }
}

export class InactiveAcountError extends ForbiddenError {
    public constructor({ content, inactiveAccountError = true }: SignInError) {
        super(JSON.stringify({ content, inactiveAccountError }));
        this.name = 'InactiveAcountError';
    }
}

export class BadRequestError extends APPError {
    constructor(message?: string) {
        super(StatusCodes.BAD_REQUEST, message);
        this.name = 'BadRequestError';
    }
}

export class ValidationError extends BadRequestError {
    constructor({ content, validdationErrors = true }: SignInError) {
        super(JSON.stringify({ content, validdationErrors }));
        this.name = 'ValidationError';
    }
}

export class LoginUnexpectedError extends APPError {
    constructor({ content, serverError = true }: SignInError) {
        super(undefined, JSON.stringify({ content, serverError }));
    }
}

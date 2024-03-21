/* eslint-disable @typescript-eslint/no-explicit-any */

import { FieldError } from '@/types';
import { StatusCodes } from 'http-status-codes';

export class APIError extends Error {
    public status: number;
    public constructor(status: number, message?: string) {
        super(message);
        this.status = status;
    }
}

export class AuthError extends APIError {
    public constructor(message?: string) {
        super(StatusCodes.INTERNAL_SERVER_ERROR, message);
    }
}

export class UnauthorizedError extends APIError {
    public constructor(message?: string) {
        super(StatusCodes.UNAUTHORIZED, message);
    }
}

export class NotFoundError extends APIError {
    public constructor(message?: string) {
        super(StatusCodes.NOT_FOUND, message);
    }
}

export class SessionNotFoundError extends APIError {
    public constructor(message?: string) {
        super(StatusCodes.NOT_FOUND, message);
    }
}

export class ConflictError extends APIError {
    public errors: Array<FieldError>;
    public constructor(errors: Array<FieldError>) {
        super(StatusCodes.CONFLICT, undefined);
        this.errors = errors;
    }
}

export class ForbiddenError extends APIError {
    public constructor(message?: string) {
        super(StatusCodes.FORBIDDEN, message);
    }
}

export class BadRequestError extends APIError {
    constructor(message?: string) {
        super(StatusCodes.BAD_REQUEST, message);
    }
}

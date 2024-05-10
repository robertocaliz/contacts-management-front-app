/* eslint-disable @typescript-eslint/no-explicit-any */

import { FieldError } from '@/types';
import { StatusCodes } from 'http-status-codes';

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

type AssociateParams = (
    message: string,
    status: number,
    arror: Record<string, unknown>,
) => void;

export class InvalidCredentialsError extends UnauthorizedError {
    public constructor(message?: string, associate?: AssociateParams) {
        super(message);
        this.name = 'InvalidCredentialsError';
        associate?.(
            message as string,
            this.status,
            this as Record<string, unknown>,
        );
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
    public constructor(message?: string, associate?: AssociateParams) {
        super(message);
        this.name = 'InactiveAcountError';
        associate?.(
            message as string,
            this.status,
            this as Record<string, unknown>,
        );
    }
}

export class BadRequestError extends APPError {
    constructor(message?: string) {
        super(StatusCodes.BAD_REQUEST, message);
        this.name = 'BadRequestError';
    }
}

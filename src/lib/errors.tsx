/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConflictErrorT } from '@/types';
import { StatusCodes } from 'http-status-codes';


export class APIError extends Error {
	public status?: number;
	public constructor(status?: number, message?: string) {
		super(message);
		this.status = status;
	}
}

export class AuthenticationError extends APIError {
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
	public errors: Array<ConflictErrorT>;
	public constructor(errors: Array<ConflictErrorT>) {
		super(StatusCodes.CONFLICT, undefined);
		this.errors = errors;
	}
}
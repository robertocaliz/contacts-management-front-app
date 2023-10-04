

export class AppError extends Error {
	public constructor(message?: string) {
		super(message);
	}
}


export class AuthenticationError extends AppError { }


export class UnauthorizedError extends AppError { }


export class NotFoundError extends AppError { }
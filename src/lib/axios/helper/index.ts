import {
    BadRequestError,
    ConflictError,
    ForbiddenError,
    NotFoundError,
    UnauthorizedError,
} from '@/lib/errors';
import { StatusCodes } from 'http-status-codes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getCustomError = (error: any) => {
    switch (error.response?.status) {
        case StatusCodes.CONFLICT:
            return new ConflictError(error.response.data.errors);
        case StatusCodes.BAD_REQUEST:
            return new BadRequestError();
        case StatusCodes.NOT_FOUND:
            return new NotFoundError();
        case StatusCodes.UNAUTHORIZED:
            return new UnauthorizedError();
        case StatusCodes.FORBIDDEN:
            return new ForbiddenError();
    }
};

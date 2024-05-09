import { DEFAULT_SERVER_ERROR } from '@/constants';
import { ConflictError } from '..';

export const handleServerError = (e: Error) => {
    if (e instanceof ConflictError) {
        return { errors: e.errors };
    }
    return { failure: DEFAULT_SERVER_ERROR };
};

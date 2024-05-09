import { DEFAULT_SERVER_ERROR } from '@/constants';
import { SafeClientOpts, createSafeActionClient } from 'next-safe-action';

const safeClientOpts: SafeClientOpts<unknown, unknown> = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleReturnedServerError(e) {
        return DEFAULT_SERVER_ERROR;
    },
    handleServerErrorLog(e) {
        console.log('Logging error...');
        console.log(e);
    },
};

export const authAction = createSafeActionClient(safeClientOpts);

export const publicAction = createSafeActionClient(safeClientOpts);

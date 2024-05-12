'use server';

import {
    emailSchema,
    idSchema,
    loginSchema,
    recoveryTokenSchema,
    signupSchema,
    updatePasswordSchema,
    updateUserSignupSchema,
} from '@/lib/schemas';
import { axiosAuth } from '@/lib/axios/auth/server';
import axiosPublic from '@/lib/axios/public';
import {
    BadRequestError,
    ConflictError,
    ForbiddenError,
    NotFoundError,
    UnauthorizedError,
} from '@/lib/errors';
import { authAction, publicAction } from '@/lib/safe-action';
import { User } from '@/types/User';

export const loginUser = publicAction(loginSchema, async (credentials) => {
    try {
        const { data: user } = await axiosPublic.post<User>(
            '/login',
            credentials,
        );
        return { user };
    } catch (error) {
        if (error instanceof UnauthorizedError) {
            return {
                invalidCredentialsError: true,
            };
        }
        if (error instanceof ForbiddenError) {
            return {
                inactiveAcountError: true,
            };
        }
        throw error;
    }
});

export const signupUser = publicAction(signupSchema, async (userData) => {
    try {
        await axiosPublic.post('/signup', userData);
        return {
            userData,
        };
    } catch (error) {
        //DataAlreadyExistsError
        if (error instanceof ConflictError) {
            return {
                dataAlreadyExistsErrors: error.errors,
            };
        }
        throw error;
    }
});
export const recoverSignup = publicAction(emailSchema, async (data) => {
    try {
        const { status } = await axiosPublic.post('/recover-sinup', data);
        return { status };
    } catch (error) {
        //EmailNotFoundError
        if (error instanceof NotFoundError) {
            return {
                status: error.status,
            };
        }
        throw error;
    }
});

export const updatePassword = publicAction(
    updatePasswordSchema,
    async ({ password, recoveryToken }) => {
        try {
            await axiosPublic.patch(`/users/${recoveryToken}`, {
                newPassword: password,
            });
            return {
                sucess: { message: 'Senha actualizada.' },
            };
        } catch (error) {
            //InvalidOrExpiredRecoveryTokenError
            if (error instanceof BadRequestError) {
                return {
                    invalidOrExpiredRecoveryToken: true,
                };
            }
            throw error;
        }
    },
);

export const activateAccount = publicAction(
    idSchema,
    async (activationToken) => {
        try {
            await axiosPublic.patch(`/signup/activate/${activationToken}`);
            return { success: { message: 'Conta activada!' } };
        } catch (error) {
            //InvalidOrExpiredRActivationTokenError
            if (error instanceof BadRequestError) {
                return { ivalidOrExpiredActivationToken: true };
            }
            throw error;
        }
    },
);

export const updateUserSignup = authAction(
    updateUserSignupSchema,
    async (userData) => {
        try {
            const {
                data: { emailSend },
            } = await axiosAuth.put(`/users/${userData.id}`, userData);
            return { emailSend: !!emailSend, userData };
        } catch (error) {
            if (error instanceof ConflictError) {
                return {
                    dataAlreadyExistsErrors: error.errors,
                };
            }
            throw error;
        }
    },
);

type UpdateUserEmailResBody = {
    newEmail: string;
};

export const updateUserEmail = publicAction(
    recoveryTokenSchema,
    async (alterationToken) => {
        try {
            const {
                data: { newEmail },
            } = await axiosPublic.patch<UpdateUserEmailResBody>(
                `/update_email/${alterationToken}`,
            );
            return { newEmail };
        } catch (error) {
            //InvalidOrExpiredAlterationkenError
            if (error instanceof BadRequestError) {
                return {
                    invalidOrExpiredAlterationken: true,
                };
            }
            throw error;
        }
    },
);

export const checkIfEmailExists = async (email: string) => {
    try {
        const { status } = await axiosPublic.post('/check_email', { email });
        return status;
    } catch (error) {
        if (error instanceof ConflictError) {
            return error.status;
        }
        throw error;
    }
};

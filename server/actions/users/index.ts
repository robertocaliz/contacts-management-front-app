'use server';

import {
    activationTokenSchema,
    alterationTokenSchema,
    emailSchema,
    loginSchema,
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
import { User } from '@/types';

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

export const signupUser = publicAction(signupSchema, async (signupData) => {
    try {
        await axiosPublic.post('/signup', signupData);
        return {
            signupData,
        };
    } catch (error) {
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
        await axiosPublic.post('/recover-sinup', data);
        return { success: {} };
    } catch (error) {
        if (error instanceof NotFoundError) {
            return {
                emailNotFound: {
                    message: 'O "email" não foi encontrado no sistema.',
                },
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
                success: {},
            };
        } catch (error) {
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
    activationTokenSchema,
    async ({ activationToken }) => {
        try {
            await axiosPublic.patch(`/signup/activate/${activationToken}`);
            return { success: { message: 'Conta activada!' } };
        } catch (error) {
            if (error instanceof BadRequestError) {
                return { invalidOrExpiredActivationToken: true };
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
            } = await axiosAuth.put(`/users/${userData._id}`, userData);
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
    alterationTokenSchema,
    async ({ alterationToken }) => {
        try {
            const {
                data: { newEmail },
            } = await axiosPublic.patch<UpdateUserEmailResBody>(
                `/update_email/${alterationToken}`,
            );
            return { newEmail };
        } catch (error) {
            if (error instanceof BadRequestError) {
                return {
                    invalidOrExpiredAlterationken: true,
                };
            }
            throw error;
        }
    },
);

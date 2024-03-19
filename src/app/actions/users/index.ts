'use server';

import {
    EMAIL_SCHEMA,
    SIGNUP_SCHEMA,
    UPDATE_PASSWORD_SCHEMA,
    UPDATE_USER_SCHEMA,
} from '@/constants/validation-schemas';
import { validate } from '@/functions/validation';
import { axiosAuth } from '@/lib/axios/auth/server';
import axiosPublic from '@/lib/axios/public';
import { BadRequestError, ConflictError, NotFoundError } from '@/lib/errors';
import { User } from '@/types';

type Email = {
    emailSend?: boolean;
};

interface CreateAccountResBody extends Email {}

export async function createAccount(user: User) {
    const errors = await validate({
        obj: user,
        schema: SIGNUP_SCHEMA,
    });
    if (errors) {
        return {
            errors,
        };
    }
    try {
        const { data: email, status } =
            await axiosPublic.post<CreateAccountResBody>('/signup', user);
        return { email, status };
    } catch (error) {
        if (error instanceof ConflictError) {
            return {
                errors: error.errors,
            };
        }
        throw error;
    }
}

export async function recoverSignup(email: string) {
    const errors = await validate({
        obj: { email },
        schema: EMAIL_SCHEMA,
    });
    if (errors) {
        return {
            errors,
        };
    }
    try {
        const { status } = await axiosPublic.post('/recover-sinup', { email });
        return { status };
    } catch (error) {
        if (error instanceof NotFoundError) {
            return {
                status: error.status,
            };
        }
        throw error;
    }
}

type ChangePasswordProps = {
    recoveryToken: string;
    dada: {
        password: string;
        confirmPassword: string;
    };
};

export const updatePassword = async (param: ChangePasswordProps) => {
    const errors = await validate({
        obj: param.dada,
        schema: UPDATE_PASSWORD_SCHEMA,
    });
    if (errors) {
        return { errors };
    }
    try {
        const { status } = await axiosPublic.patch(
            `/users/${param.recoveryToken}`,
            { newPassword: param.dada.password },
        );
        return {
            status,
        };
    } catch (error) {
        if (error instanceof BadRequestError) {
            return {
                status: error.status,
            };
        }
        throw error;
    }
};

export const activateAccount = async (activationToken: string) => {
    try {
        const { status } = await axiosPublic.patch(
            `/signup/activate/${activationToken}`,
        );
        return status;
    } catch (error) {
        if (error instanceof BadRequestError) {
            return error.status;
        }
        throw error;
    }
};

interface UpdateUserResBody extends Email {}

export const update = async (user: Partial<User>, userId: string) => {
    const errors = await validate({
        obj: user,
        schema: UPDATE_USER_SCHEMA,
    });
    if (errors) {
        return {
            errors,
        };
    }
    try {
        const {
            data: { emailSend },
        } = await axiosAuth.put<UpdateUserResBody>(`/users/${userId}`, user);
        return {
            emailSend: !!emailSend,
        };
    } catch (error) {
        if (error instanceof ConflictError) {
            return {
                errors: error.errors,
            };
        }
        throw error;
    }
};

type UpdateEmailResBody = {
    newEmail: string;
};

export const updateEmail = async (alterationToken: string) => {
    try {
        const {
            data: { newEmail },
            status,
        } = await axiosPublic.patch<UpdateEmailResBody>(
            `/update_email/${alterationToken}`,
        );
        return {
            status,
            newEmail,
        };
    } catch (error) {
        if (error instanceof BadRequestError) {
            return {
                status: error.status,
            };
        }
        throw error;
    }
};

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

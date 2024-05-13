'use client';

import { User } from '@/types';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import SubmitButton from '@/components/buttons/submit';
import SignupRecoverButton from '@/components/buttons/signup-recover';
import Form, { FormHeader, Input } from '@/components/form';
import { useAlert, useUpdateUserSession } from '@/hooks';
import {
    showErrors,
    objChanged,
    showValidationErrors,
} from '@/functions/forms';
import { Centralize, RequiredFieldNotification } from '@/components';
import { updateUserSignup } from '../../server/actions/users';
import { useAction } from 'next-safe-action/hooks';
import { z } from 'zod';
import { updateUserSignupSchema } from '@/lib/schemas';
import { INTERNET_CONECTION_ERROR } from '@/constants';
import { isUserOnline } from '@/functions';

export const ProfileForm = () => {
    const [userData, setUserData] = useState<User>({} as User);
    const { session, updateUserSession } = useUpdateUserSession();
    const { alertType, alertMessage, showAlert, alert } = useAlert();

    const {
        clearErrors,
        formState: { errors },
        getValues,
        register,
        reset,
        setError,
    } = useForm<z.infer<typeof updateUserSignupSchema>>();

    const { execute } = useAction(updateUserSignup, {
        async onSuccess({ dataAlreadyExistsErrors, userData, emailSend }) {
            if (dataAlreadyExistsErrors) {
                return showErrors(dataAlreadyExistsErrors, setError);
            }
            await updateUserSession({ name: userData.name }).then(() => {
                if (emailSend) {
                    return alert.show(
                        'warning',
                        `Clique no link que enviamos, 
                                para confirmar a alteração do seu email.`,
                    );
                }
                alert.show('success', 'Perfíl actualizado!');
            });
        },
        onError({ validationErrors, serverError }) {
            if (validationErrors) {
                return showValidationErrors(validationErrors, setError);
            }
            if (serverError || !serverError) {
                alert.show('danger', String(serverError));
            }
        },
    });

    useEffect(() => {
        setUserData(session?.user as User);
    }, [session]);

    useEffect(() => {
        reset(userData);
    }, [userData]);

    const handleUpdateProfile = async () => {
        clearErrors();
        if (!isUserOnline()) {
            return alert.show('danger', INTERNET_CONECTION_ERROR);
        }
        const data = getValues();
        if (
            !objChanged({
                originalObj: userData,
                newObj: data,
            })
        ) {
            return alert.show('warning', 'O perfíl não foi alterado.');
        }
        execute({ ...data, _id: userData._id });
    };

    return (
        <Centralize>
            <Alert variant={alertType} show={showAlert}>
                {alertMessage}
            </Alert>
            <Form action={handleUpdateProfile}>
                <FormHeader text='Actualizar Perfíl' />
                <Input
                    label='Nome *'
                    {...register('name')}
                    errMessage={errors.name?.message}
                />
                <Input
                    label='Email *'
                    {...register('email')}
                    errMessage={errors.email?.message}
                />
                <RequiredFieldNotification />
                <SubmitButton
                    spinnerText='Actualizando...'
                    content='Actualizar'
                />
            </Form>
            <SignupRecoverButton text='Clique aqui para recuperar ou alterar a senha.' />
        </Centralize>
    );
};

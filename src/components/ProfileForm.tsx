'use client';

import { User } from '@/types';
import FormHeader from './form-header';
import Input from './input';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import useAlert from '@/hooks/use-alert';
import { objChanged } from '@/functions/object';
import Centralize from './centralize';
import SubmitButton from './buttons/submit';
import { update as updateProfile } from '@/app/actions/users';
import SignupRecoverButton from './buttons/signup-recover';
import Form from './form';
import { useUpdateSessionUser } from '@/hooks';
import { displayMessages } from '@/functions/form';
import { RequiredFieldNotification } from '.';

export const ProfileForm = () => {
    const [userData, setUserData] = useState<Partial<User>>({});

    const { session, updateSessionUser } = useUpdateSessionUser();

    const { alertType, alertMessage, showAlert, alert } = useAlert();

    const {
        register,
        reset,
        formState: { errors },
        getValues,
        clearErrors,
        setError,
    } = useForm<Partial<User>>();

    useEffect(() => {
        reset(session?.user);
        setUserData(session?.user as Partial<User>);
    }, [session]);

    const profileChanged = (newUserData: Partial<User>) => {
        return objChanged({
            originalObj: userData,
            newObj: newUserData,
        });
    };

    const handleUpdateProfile = async () => {
        clearErrors();
        const newUserData = getValues();
        if (!profileChanged(newUserData)) {
            return alert.show('warning', 'O perfíl não foi alterado.');
        }
        if (newUserData.email === userData.email) {
            delete newUserData['email'];
        }
        const { errors, emailSend } = await updateProfile(
            newUserData,
            userData._id as string,
        );
        if (errors) {
            displayMessages(errors, setError);
            return;
        }
        await updateSessionUser({ name: newUserData.name }).then(() => {
            if (emailSend) {
                return alert.show(
                    'warning',
                    `Clique no link que enviamos, 
						para confirmar a alteração do seu email.`,
                );
            }
            alert.show('success', 'Perfíl actualizado!');
        });
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

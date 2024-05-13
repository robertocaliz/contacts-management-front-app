'use client';

import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import Alert from 'react-bootstrap/Alert';
import SubmitButton from './buttons/submit';
import SignUpButton from './buttons/signup';
import SignupRecoverButton from './buttons/signup-recover';
import Form, { FormHeader, Input, PasswordInput } from './form';
import { Centralize, Footer } from '@/components';
import { useAlert } from '@/hooks';
import { SignInError, UserCredentials } from '@/types';
import { showValidationErrors } from '@/functions/forms';
import { isUserOnline } from '@/functions';
import { INTERNET_CONECTION_ERROR } from '@/constants';
import { useRouter } from 'next/navigation';

export function LoginForm() {
    const router = useRouter();
    const { alertType, alertMessage, showAlert, alert } = useAlert();
    const {
        clearErrors,
        formState: { errors },
        getValues,
        register,
        setError,
    } = useForm<UserCredentials>();

    const handleLoginUser = async () => {
        clearErrors();
        if (!isUserOnline()) {
            return alert.show('danger', INTERNET_CONECTION_ERROR);
        }
        const credentials = getValues();
        const response = await signIn('credentials', {
            ...credentials,
            redirect: false,
        });
        const error = JSON.parse(String(response?.error)) as SignInError;
        if (error) {
            if (error.validdationErrors) {
                return showValidationErrors(
                    error.content as Record<string, string[]>,
                    setError,
                );
            }
            if (error.inactiveAccountError || error.invalidCredentialsError) {
                return alert.show('warning', String(error.content));
            }
            if (error.serverError || !error.serverError) {
                return alert.show('danger', String(error.content));
            }
        }
        router.replace('/');
    };

    return (
        <Centralize>
            <Alert variant={alertType} show={showAlert}>
                {alertMessage}
            </Alert>
            <Form action={handleLoginUser}>
                <FormHeader text='Login' />
                <main>
                    <Input
                        label='Email'
                        {...register('email')}
                        errMessage={errors.email?.message}
                    />
                    <PasswordInput
                        label='Senha'
                        {...register('password')}
                        errMessage={errors.password?.message}
                    />
                    <SubmitButton
                        content='login'
                        spinnerText='Autenticando...'
                    />
                </main>
                <Footer className='flex flex-col gap-2 text-center'>
                    <div>
                        <span>Novo no ContactsPro? </span>
                        <SignUpButton content='Crie sua conta aqui.' />
                    </div>
                    <div>
                        <span>Esqueceu sua senha? </span>
                        <SignupRecoverButton text='Clique aqui.' />
                    </div>
                </Footer>
            </Form>
        </Centralize>
    );
}

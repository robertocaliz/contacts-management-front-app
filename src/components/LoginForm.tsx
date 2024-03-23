'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Centralize from './centralize';
import FormHeader from './form-header';
import Input from './input';
import { SignInError, UserCredentials } from '@/types';
import PasswordInput from './password-input';
import { StatusCodes } from 'http-status-codes';
import Alert from 'react-bootstrap/Alert';
import useAlert from '@/hooks/use-alert';
import SubmitButton from './buttons/submit';
import SignUpButton from './buttons/signup';
import SignupRecoverButton from './buttons/signup-recover';
import Form from './form';
import { displayMessages } from '@/functions/form';
import { Footer } from '.';

export function LoginForm() {
    const {
        register,
        formState: { errors },
        getValues,
        setError,
        clearErrors,
    } = useForm<UserCredentials>();

    const router = useRouter();

    const { alertType, alertMessage, showAlert, alert } = useAlert();

    const loginUser = async () => {
        clearErrors();
        const credentials = getValues();
        const response = await signIn('credentials', {
            ...credentials,
            redirect: false,
        });
        const error = JSON.parse(String(response?.error)) as SignInError;
        if (error) {
            if (error.status === StatusCodes.BAD_REQUEST) {
                displayMessages(JSON.parse(error.message), setError);
                return;
            }
            if (
                error.status === StatusCodes.FORBIDDEN ||
                error.status === StatusCodes.UNAUTHORIZED
            ) {
                alert.show('warning', error.message);
                return;
            }
            alert.show('danger', error.message);
            return;
        }
        router.replace('/');
    };

    return (
        <Centralize>
            <Alert variant={alertType} show={showAlert}>
                {alertMessage}
            </Alert>
            <Form action={loginUser}>
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

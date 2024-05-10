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
import { UserCredentials } from '@/types';

export function LoginForm() {
    const {
        register,
        formState: { errors },
        getValues,
        clearErrors,
    } = useForm<UserCredentials>();

    const { alertType, alertMessage, showAlert } = useAlert();

    const loginUser = async () => {
        clearErrors();
        const credentials = getValues();
        const response = await signIn('credentials', {
            ...credentials,
            redirect: false,
        });
        console.log(JSON.parse(response?.error as string));
        // const error = JSON.parse(String(response?.error)) as SignInError;
        // if (error) {
        //     if (error.status === StatusCodes.BAD_REQUEST) {
        //         displayMessages(JSON.parse(error.message), setError);
        //         return;
        //     }
        //     if (
        //         error.status === StatusCodes.FORBIDDEN ||
        //         error.status === StatusCodes.UNAUTHORIZED
        //     ) {
        //         alert.show('warning', error.message);
        //         return;
        //     }
        //     alert.show('danger', error.message);
        //     return;
        // }
        // router.replace('/');
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

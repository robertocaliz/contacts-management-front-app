'use client';

import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useState } from 'react';
import SubmitButton from './buttons/submit';
import LoginButton from './buttons/login';
import Form, { CheckBox, FormHeader, Input, PasswordInput } from './form';
import { showMessages, showValidationErrors } from '@/functions/forms';
import { Centralize, Footer } from '@/components';
import { SignupData, FieldError } from '@/types';
import { useRouter } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { signupUser } from '../../server/actions/users';
import { isUserOnline } from '@/functions';
import Alert from 'react-bootstrap/Alert';
import { useAlert } from '@/hooks';
import { INTERNET_CONECTION_ERROR } from '@/constants';

export function SignUpForm() {
    const router = useRouter();
    const [disableSubmitButton, setDisableSubmitButton] = useState(true);
    const { alertType, alertMessage, showAlert, alert } = useAlert();

    const {
        register,
        reset,
        setError,
        formState: { errors },
        getValues,
        clearErrors,
    } = useForm<SignupData>();

    const { execute } = useAction(signupUser, {
        onSuccess({ dataAlreadyExistsErrors, userData }) {
            if (dataAlreadyExistsErrors) {
                showMessages(dataAlreadyExistsErrors as FieldError[], setError);
                return;
            }
            reset();
            router.replace(`/signup/confirm/${userData.email}`);
        },
        onError({ validationErrors, serverError }) {
            if (validationErrors) {
                showValidationErrors(
                    validationErrors as Record<string, string[]>,
                    setError,
                );
                return;
            }
            if (serverError || !serverError) {
                alert.show('danger', String(serverError));
            }
        },
    });

    const handleSignupUser = async () => {
        if (!isUserOnline()) {
            return alert.show('danger', INTERNET_CONECTION_ERROR);
        }
        clearErrors();
        execute(getValues());
    };

    return (
        <Centralize>
            <Alert variant={alertType} show={showAlert}>
                {alertMessage}
            </Alert>
            <Form action={handleSignupUser}>
                <FormHeader text='Cadastro' />
                <main>
                    <Input
                        label='Nome de usuário'
                        {...register('name')}
                        errMessage={errors.name?.message}
                    />
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
                    <PasswordInput
                        label='Confirmar senha'
                        {...register('confirmPassword')}
                        errMessage={errors.confirmPassword?.message}
                    />
                    <CheckBox
                        label={
                            <div>
                                <span>Li e estou de acordo com os </span>
                                <Link href='/terms-of-use'>Termos de Uso.</Link>
                            </div>
                        }
                        onChange={() =>
                            setDisableSubmitButton(
                                (disableSubmitButton) => !disableSubmitButton,
                            )
                        }
                    />
                    <SubmitButton
                        content='Criar conta'
                        spinnerText='Criando a conta...'
                        disabled={disableSubmitButton}
                    />
                </main>
                <Footer>
                    <div className='text-center'>
                        <span>Já passue uma conta? </span>
                        <LoginButton content='Click aqui para acessar.' />
                    </div>
                </Footer>
            </Form>
        </Centralize>
    );
}

'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import { useState } from 'react';
import SubmitButton from './buttons/submit';
import LoginButton from './buttons/login';
import Form, { CheckBox, FormHeader, Input, PasswordInput } from './form';
import { showErrors, showValidationErrors } from '@/functions/forms';
import { Centralize, Footer } from '@/components';
import { SignupData, FieldError } from '@/types';
import { useRouter } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { signupUser } from '../../server/actions/users';
import Alert from 'react-bootstrap/Alert';
import { useAlert } from '@/hooks';

export function SignUpForm() {
    const router = useRouter();
    const [disableSubmitButton, setDisableSubmitButton] = useState(true);
    const { alertType, alertMessage, showAlert, alert } = useAlert();

    const {
        clearErrors,
        formState: { errors },
        handleSubmit,
        register,
        reset,
        setError,
    } = useForm<SignupData>();

    const { execute, status: actionStatus } = useAction(signupUser, {
        onSuccess({ dataAlreadyExistsErrors, signupData }) {
            //
            if (dataAlreadyExistsErrors) {
                return showErrors(
                    dataAlreadyExistsErrors as FieldError[],
                    setError,
                );
            }

            reset();
            router.replace(`/signup/confirm/${signupData.email}`);
        },
        onError({ validationErrors, serverError }) {
            //
            if (validationErrors) {
                return showValidationErrors(
                    validationErrors as Record<string, string[]>,
                    setError,
                );
            }

            alert.show('danger', String(serverError));
        },
    });

    const onSubmit: SubmitHandler<SignupData> = (data) => {
        clearErrors();
        execute(data);
    };

    return (
        <Centralize>
            <Alert variant={alertType} show={showAlert}>
                {alertMessage}
            </Alert>
            <Form onSubmit={handleSubmit(onSubmit)}>
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
                        submittingForm={actionStatus === 'executing'}
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

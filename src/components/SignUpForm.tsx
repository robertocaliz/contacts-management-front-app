'use client';

import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { User } from '@/types';
import { useState } from 'react';
import SubmitButton from './buttons/submit';
import LoginButton from './buttons/login';
import Form, { CheckBox, FormHeader, Input, PasswordInput } from './form';
import { displayMessages } from '@/functions/form';
import { StatusCodes } from 'http-status-codes';
import { Centralize, Footer } from '@/components';
import { checkIfEmailExists, createAccount } from '../../server/actions/users';

type AccountData = {
    confirmPassword?: string;
} & User;

export function SignUpForm() {
    const [disableSubmitButton, setDisableSubmitButton] = useState(true);

    const {
        register,
        reset,
        setError,
        formState: { errors },
        getValues,
        clearErrors,
    } = useForm<AccountData>();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const _checkIfEmailExists = async (e: any) => {
        const email = e.target.value;
        await checkIfEmailExists(email).then((status) => {
            if (!(status === StatusCodes.OK)) {
                setError('email', {
                    message: 'Email já está em uso.',
                });
                return;
            }
            setError('email', {
                message: '',
            });
        });
    };

    const handleCreateAccount = async () => {
        clearErrors();
        const accountData = getValues();
        const { errors } = await createAccount(accountData);
        if (errors) {
            console.log(errors);
            displayMessages(errors, setError);
            return;
        }
        reset();
        redirect(`/signup/confirm/${accountData.email}`);
    };

    return (
        <Centralize>
            <Form action={handleCreateAccount}>
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
                        onBlur={_checkIfEmailExists}
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

'use client';

import Centralize from './centralize';
import { User } from '@/types';
import { useRouter } from 'next/navigation';
import { recoverSignup } from '@/app/actions/users';
import { displayMessages } from '@/functions/form';
import { StatusCodes } from 'http-status-codes';
import { useForm } from 'react-hook-form';
import SubmitButton from './buttons/submit';
import BackButton from './buttons/back';
import Form, { FormHeader, Input } from './form';

export function FormRecoverSignup() {
    const router = useRouter();

    const {
        reset,
        register,
        formState: { errors },
        setError,
        getValues,
        clearErrors,
    } = useForm<Pick<User, 'email'>>();

    const handleRecoverSignup = async () => {
        clearErrors();
        const { errors, status } = await recoverSignup(getValues().email);
        if (errors) {
            displayMessages(errors, setError);
            return;
        }
        if (status === StatusCodes.NOT_FOUND) {
            setError('email', {
                message: 'O "email" não foi encontrado no sistema.',
            });
            return;
        }
        reset();
        router.push('/signup/recover/confirm');
    };

    return (
        <Centralize>
            <Form action={handleRecoverSignup}>
                <FormHeader text='Recuperação de senha' />
                <Input
                    label='Digite seu e-mail'
                    {...register('email')}
                    errMessage={errors.email?.message}
                />
                <SubmitButton
                    content='Recuperar'
                    spinnerText='Recuperando...'
                />
            </Form>
            <BackButton />
        </Centralize>
    );
}

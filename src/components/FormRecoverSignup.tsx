'use client';

import { useRouter } from 'next/navigation';
import { displayMessages } from '@/functions/form';
import { StatusCodes } from 'http-status-codes';
import { useForm } from 'react-hook-form';
import SubmitButton from './buttons/submit';
import BackButton from './buttons/back';
import Form, { FormHeader, Input } from '@/components/form';
import { SiGmail } from 'react-icons/si';
import { Centralize } from '@/components';
import { recoverSignup } from '../../server/actions/users';
import { RecoverSignupType } from '@/types';

export function FormRecoverSignup() {
    const router = useRouter();

    const {
        reset,
        register,
        formState: { errors },
        setError,
        getValues,
        clearErrors,
    } = useForm<RecoverSignupType>();

    const handleRecoverSignup = async () => {
        clearErrors();
        const { errors, status } = await recoverSignup(getValues());
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
        router.replace('/signup/recover/confirm');
    };

    return (
        <Centralize>
            <Form action={handleRecoverSignup}>
                <FormHeader text='Recuperação de senha' />
                <Input
                    label='Digite seu e-mail'
                    {...register('email')}
                    errMessage={errors.email?.message}
                    startAdornment={<SiGmail className='text-red-500' />}
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

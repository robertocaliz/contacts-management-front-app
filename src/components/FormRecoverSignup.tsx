'use client';

import { useRouter } from 'next/navigation';
import { StatusCodes } from 'http-status-codes';
import { useForm } from 'react-hook-form';
import SubmitButton from './buttons/submit';
import BackButton from './buttons/back';
import Form, { FormHeader, Input } from '@/components/form';
import { SiGmail } from 'react-icons/si';
import { Centralize } from '@/components';
import { recoverSignup } from '../../server/actions/users';
import { useAction } from 'next-safe-action/hooks';
import { z } from 'zod';
import { emailSchema } from '@/lib/schemas';
import Alerts from '@/lib/alerts';

export function FormRecoverSignup() {
    const router = useRouter();

    const {
        reset,
        register,
        formState: { errors },
        setError,
        getValues,
        clearErrors,
    } = useForm<z.infer<typeof emailSchema>>();

    const { execute } = useAction(recoverSignup, {
        onSuccess(data) {
            if (data.status === StatusCodes.NOT_FOUND) {
                setError('email', {
                    message: 'O "email" não foi encontrado no sistema.',
                });
                return;
            }
            reset();
            router.replace('/signup/recover/confirm');
        },
        onError({ validationErrors, serverError }) {
            if (validationErrors) {
                setError('email', {
                    message: validationErrors.email?.pop(),
                });
                return;
            }
            Alerts.error(String(serverError));
        },
    });

    const handleRecoverSignup = async () => {
        clearErrors();
        execute(getValues());
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

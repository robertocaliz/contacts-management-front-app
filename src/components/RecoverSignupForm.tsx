'use client';

import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import SubmitButton from './buttons/submit';
import BackButton from './buttons/back';
import Form, { FormHeader, Input } from '@/components/form';
import { SiGmail } from 'react-icons/si';
import { Centralize } from '@/components';
import { recoverSignup } from '../../server/actions/users';
import { useAction } from 'next-safe-action/hooks';
import { z } from 'zod';
import { emailSchema } from '@/lib/schemas';
import { showValidationErrors } from '@/functions/forms';
import Alert from 'react-bootstrap/Alert';
import { useAlert } from '@/hooks';

export function RecoverSignupForm() {
    const router = useRouter();
    const { alertType, showAlert, alertMessage, alert } = useAlert();
    const {
        clearErrors,
        formState: { errors },
        handleSubmit,
        reset,
        register,
        setError,
    } = useForm<z.infer<typeof emailSchema>>();

    const { execute, status: actonStatus } = useAction(recoverSignup, {
        onSuccess({ emailNotFound }) {
            if (emailNotFound) {
                return setError('email', {
                    message: emailNotFound.message,
                });
            }
            reset();
            router.replace('/signup/recover/confirm');
        },
        onError({ validationErrors, serverError }) {
            if (validationErrors) {
                return showValidationErrors(validationErrors, setError);
            }

            alert.show('danger', String(serverError));
        },
    });

    const onSubmit: SubmitHandler<z.infer<typeof emailSchema>> = (email) => {
        clearErrors();
        execute(email);
    };

    return (
        <Centralize>
            <Alert variant={alertType} show={showAlert}>
                {alertMessage}
            </Alert>
            <Form onSubmit={handleSubmit(onSubmit)}>
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
                    submittingForm={actonStatus === 'executing'}
                />
            </Form>
            <BackButton />
        </Centralize>
    );
}

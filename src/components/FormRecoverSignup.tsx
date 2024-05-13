'use client';

import { useRouter } from 'next/navigation';
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
import { showValidationErrors } from '@/functions/forms';
import Alert from 'react-bootstrap/Alert';
import { useAlert } from '@/hooks';
import { INTERNET_CONECTION_ERROR } from '@/constants';
import { isUserOnline } from '@/functions';

export function FormRecoverSignup() {
    const router = useRouter();
    const { alertType, showAlert, alertMessage, alert } = useAlert();
    const {
        reset,
        register,
        formState: { errors },
        setError,
        getValues,
        clearErrors,
    } = useForm<z.infer<typeof emailSchema>>();

    const { execute } = useAction(recoverSignup, {
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
            Alerts.error(String(serverError));
        },
    });

    const handleRecoverSignup = async () => {
        clearErrors();
        if (!isUserOnline()) {
            return alert.show('danger', INTERNET_CONECTION_ERROR);
        }
        execute(getValues());
    };

    return (
        <Centralize>
            <Alert variant={alertType} show={showAlert}>
                {alertMessage}
            </Alert>
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

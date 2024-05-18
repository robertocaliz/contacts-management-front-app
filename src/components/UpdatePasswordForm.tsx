'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import Alert from 'react-bootstrap/Alert';
import { useParams, useRouter } from 'next/navigation';
import SubmitButton from './buttons/submit';
import Form, { FormHeader, PasswordInput } from '@/components/form';
import { Centralize } from '@/components';
import { useAlert } from '@/hooks';
import { updatePassword } from '../../server/actions/users';
import { Passwords } from '@/types';
import { useAction } from 'next-safe-action/hooks';
import { showValidationErrors } from '@/functions/forms';

export function UpdatePasswordForm() {
    const router = useRouter();
    const params = useParams();
    const { alertType, alertMessage, showAlert, alert } = useAlert();

    const {
        formState: { errors },
        handleSubmit,
        reset,
        register,
        clearErrors,
        setError,
    } = useForm<Passwords>();

    const { execute, status: actionStatus } = useAction(updatePassword, {
        onSuccess({ invalidOrExpiredRecoveryToken }) {
            if (invalidOrExpiredRecoveryToken) {
                alert.show(
                    'warning',
                    `Token de recuperação expirado ou inválido.
            				Clique no link "Clique aqui" da página de login,
            				para obter um novo token de recuperação.`,
                );
                return;
            }

            reset();
            router.replace('/signup/recover/success');
        },
        onError({ validationErrors, serverError }) {
            if (validationErrors) {
                showValidationErrors(validationErrors, setError);
                return;
            }

            alert.show('danger', String(serverError));
        },
    });

    const onSubmit: SubmitHandler<Passwords> = (passwords) => {
        clearErrors();

        execute({
            ...passwords,
            recoveryToken: String(params.recoveryToken),
        });
    };

    return (
        <Centralize>
            <Alert variant={alertType} show={showAlert}>
                {alertMessage}
            </Alert>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormHeader text='Defina uma nova senha' />
                <PasswordInput
                    type='password'
                    label='Senha'
                    {...register('password')}
                    errMessage={errors.password?.message}
                />
                <PasswordInput
                    type='password'
                    label='Repita a senha'
                    {...register('confirmPassword')}
                    errMessage={errors.confirmPassword?.message}
                />
                <SubmitButton
                    content='Alterar senha'
                    spinnerText='Alterando...'
                    submittingForm={actionStatus === 'executing'}
                />
            </Form>
        </Centralize>
    );
}

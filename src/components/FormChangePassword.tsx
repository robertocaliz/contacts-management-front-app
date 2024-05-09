'use client';

import { useForm } from 'react-hook-form';
import Alert from 'react-bootstrap/Alert';
import { useParams, useRouter } from 'next/navigation';
import SubmitButton from './buttons/submit';
import Form, { FormHeader, PasswordInput } from '@/components/form';
import { Centralize } from '@/components';
import { useAlert } from '@/hooks';
import { updatePassword } from '../../server/actions/users';
import { Passwords } from '@/types';
import { useAction } from 'next-safe-action/hooks';
import Alerts from '@/lib/alerts';

export function FormChangePassword() {
    const router = useRouter();
    const params = useParams();

    const { alertType, alertMessage, showAlert, alert } = useAlert();

    const {
        formState: { errors },
        reset,
        register,
        getValues,
        clearErrors,
    } = useForm<Passwords>();

    const { execute } = useAction(updatePassword, {
        onSuccess(data) {
            if (data.invalidOrExpiredRecoveryToken) {
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
                console.log(validationErrors);
                return;
            }
            Alerts.error(String(serverError));
        },
    });

    const handleUpdatePassword = async () => {
        clearErrors();
        execute({
            ...getValues(),
            recoveryToken: String(params.recoveryToken),
        });
        //reset() of next-safe-action
    };

    return (
        <Centralize>
            <Alert variant={alertType} show={showAlert}>
                {alertMessage}
            </Alert>
            <Form action={handleUpdatePassword}>
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
                />
            </Form>
        </Centralize>
    );
}

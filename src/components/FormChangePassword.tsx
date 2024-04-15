'use client';

import { useForm } from 'react-hook-form';
import Alert from 'react-bootstrap/Alert';
import { StatusCodes } from 'http-status-codes';
import { useParams, useRouter } from 'next/navigation';
import SubmitButton from './buttons/submit';
import { displayMessages } from '@/functions/form';
import Form, { FormHeader, PasswordInput } from '@/components/form';
import { Centralize } from '@/components';
import { useAlert } from '@/hooks';
import { updatePassword } from '../../server/actions/users';
import { Passwords } from '@/types';

export function FormChangePassword() {
    const router = useRouter();
    const params = useParams();

    const { alertType, alertMessage, showAlert, alert } = useAlert();

    const {
        formState: { errors },
        reset,
        register,
        getValues,
        setError,
        clearErrors,
    } = useForm<Passwords>();

    const handleUpdatePassword = async () => {
        clearErrors();
        const { errors, status } = await updatePassword({
            recoveryToken: String(params.recoveryToken),
            dada: getValues(),
        });
        if (errors) {
            displayMessages(errors, setError);
            return;
        }
        if (status === StatusCodes.BAD_REQUEST) {
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

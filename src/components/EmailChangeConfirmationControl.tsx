'use client';

import Alert from 'react-bootstrap/Alert';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { updateUserSession } from '@/functions/session';
import { Centralize } from '@/components';
import { useAlert } from '@/hooks';
import { updateUserEmail } from '../../server/actions/users';
import { useAction } from 'next-safe-action/hooks';

export const EmailChangeConfirmationControl = () => {
    const params = useParams();
    const { alertType, alertMessage, alert } = useAlert();

    const { execute } = useAction(updateUserEmail, {
        async onSuccess({ invalidOrExpiredAlterationken, newEmail }) {
            if (invalidOrExpiredAlterationken) {
                return alert.show(
                    'warning',
                    `Token de alteração expirado ou inválido.
						Solicite um novo token de alteração.`,
                );
            }
            await updateUserSession({ email: newEmail }).then(() => {
                alert.show('success', 'Seu email foi alterado com sucesso!');
            });
        },
        onError({ serverError }) {
            alert.show('danger', String(serverError));
        },
    });

    useEffect(() => {
        execute({ recoveryToken: String(params.alterationToken) });
    }, [params]);

    return (
        <Centralize>
            <Alert variant={alertType} className='text-center'>
                {alertMessage ?? (
                    <span>Analizando o token de alteração...</span>
                )}
            </Alert>
        </Centralize>
    );
};

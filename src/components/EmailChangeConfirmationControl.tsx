'use client';

import Alert from 'react-bootstrap/Alert';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { updateEmail } from '@/app/actions/users';
import { StatusCodes } from 'http-status-codes';
import { updateUserSession } from '@/functions/session';
import { GLOBAL_ERROR_MESSAGE } from '@/constants';
import { Centralize } from '@/components';
import { useAlert } from '@/hooks';

export const EmailChangeConfirmationControl = () => {
    const params = useParams();
    const { alertType, alertMessage, alert } = useAlert();

    useEffect(() => {
        updateEmail(String(params.alterationToken))
            .then(async ({ status, newEmail }) => {
                if (status === StatusCodes.OK) {
                    return await updateUserSession({ email: newEmail }).then(
                        () => {
                            alert.show(
                                'success',
                                'Seu email foi alterado com sucesso!',
                            );
                        },
                    );
                }
                alert.show(
                    'warning',
                    `Token de alteração expirado ou inválido.
						Solicite um novo token de alteração.`,
                );
            })
            .catch(() => {
                alert.show('danger', GLOBAL_ERROR_MESSAGE);
            });
    }, []);

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

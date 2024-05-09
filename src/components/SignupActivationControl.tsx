'use client';

import { useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import { useParams } from 'next/navigation';
import { Centralize } from '@/components';
import { useAlert } from '@/hooks';
import { activateAccount } from '../../server/actions/users';
import { useAction } from 'next-safe-action/hooks';

export const SinupActivationControl = () => {
    const params = useParams();
    const { alertType, alertMessage, alert } = useAlert();

    const { execute } = useAction(activateAccount, {
        onSuccess(data) {
            if (data.ivalidOrExpiredActivationToken) {
                alert.show(
                    'success',
                    `A sua conta foi activada com sucesso.
                        Faça login e comece a utilizar o nosso aplicativo.
                    `,
                );
                return;
            }
            alert.show(
                'warning',
                `Token expirado ou inválido.
                    Faça login para obter um novo token e activar a sua conta.
                `,
            );
        },
        onError({ serverError }) {
            alert.show('danger', String(serverError));
        },
    });

    useEffect(() => {
        execute({ id: String(params.activationToken) });
    }, [params]);

    return (
        <Centralize>
            <Alert variant={alertType}>
                {alertMessage ?? 'Analizando o token de activação...'}
            </Alert>
        </Centralize>
    );
};

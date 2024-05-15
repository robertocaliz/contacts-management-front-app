'use client';

import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import { useParams } from 'next/navigation';
import { Centralize, SquareRain } from '@/components';
import { useAlert } from '@/hooks';
import { activateAccount } from '../../server/actions/users';
import { useAction } from 'next-safe-action/hooks';

export const SinupActivationControl = () => {
    const params = useParams();
    const { alertType, alertMessage, alert } = useAlert();
    const [showSquareRain, setShowSquareRain] = useState(false);

    const handleShowSquareRain = () => {
        setShowSquareRain(true);
    };

    const { execute } = useAction(activateAccount, {
        onSuccess({ invalidOrExpiredActivationToken }) {
            if (invalidOrExpiredActivationToken) {
                return alert.show(
                    'warning',
                    `Token expirado ou inválido.
                        Faça login para obter um novo token e activar a sua conta.
                    `,
                );
            }
            alert.show(
                'success',
                `A sua conta foi activada com sucesso.
                    Faça login e comece a utilizar o nosso aplicativo.
                `,
            );
            handleShowSquareRain();
        },
        onError({ serverError }) {
            alert.show('danger', String(serverError));
        },
    });

    useEffect(() => {
        execute({ activationToken: String(params.activationToken) });
    }, [params]);

    return (
        <>
            <Centralize>
                <Alert variant={alertType}>
                    {alertMessage ?? 'Analizando o token de activação...'}
                </Alert>
            </Centralize>
            {showSquareRain && <SquareRain />}
        </>
    );
};

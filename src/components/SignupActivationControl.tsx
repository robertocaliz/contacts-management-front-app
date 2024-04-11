'use client';

import { StatusCodes } from 'http-status-codes';
import { useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import { useParams } from 'next/navigation';
import { activateAccount } from '@/app/actions/users';
import { GLOBAL_ERROR_MESSAGE } from '@/constants';
import { Centralize } from '@/components';
import { useAlert } from '@/hooks';

export const SinupActivationControl = () => {
    const params = useParams();
    const { alertType, alertMessage, alert } = useAlert();

    useEffect(() => {
        activateAccount(String(params.activationToken))
            .then((status) => {
                if (status === StatusCodes.OK) {
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
            })
            .catch(() => {
                alert.show('danger', GLOBAL_ERROR_MESSAGE);
            });
    }, []);

    return (
        <Centralize>
            <Alert variant={alertType}>
                {alertMessage ?? 'Analizando o token de activação...'}
            </Alert>
        </Centralize>
    );
};

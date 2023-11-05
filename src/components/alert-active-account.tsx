'use client';

import { GLOBAL_ERROR_MESSAGE } from '@/constants';
import useAlert from '@/hooks/use.alert';
import { UsersProvider } from '@/lib/providers/users';
import { StatusCodes } from 'http-status-codes';
import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Spinner from './spinner';



export default function AlertActiveAccount({ activationToken }: { activationToken: string }) {

	const [activatingAccount, setActivatingAccount] = useState(true);

	const {
		alertType,
		alertMessage,
		showAlert,
		alert
	} = useAlert();


	useEffect(() => {
		UsersProvider
			.activateAccount(activationToken)
			.then(status => {
				if (status === StatusCodes.OK) {
					alert.show('warning',
						`A sua conta foi activada com sucesso.
							Faça o login e comece a utilizar o nosso aplicativo.
						`
					);
					return;
				}
				alert.show('warning',
					`Token expirado ou inválido.
						Faça login para obter um novo token e activar a sua conta.
					`
				);
			})
			.catch(() => {
				alert.show('danger',
					GLOBAL_ERROR_MESSAGE);
			})
			.finally(() => {
				setActivatingAccount(!activatingAccount);
			});
	}, []);


	if (activatingAccount) return <Spinner loading={activatingAccount} text='Activando a conta...' />;


	return <Alert variant={alertType} show={showAlert} >{alertMessage}</Alert>;

}
'use client';

import { GLOBAL_ERROR_MESSAGE } from '@/constants';
import useAlert from '@/hooks/use.alert';
import { StatusCodes } from 'http-status-codes';
import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Spinner from './spinner';
import { useParams } from 'next/navigation';
import { activateAccount } from '@/app/actions/users';


export default function AlertActiveAccount() {

	const [activatingAccount, setActivatingAccount] = useState(true);

	const params = useParams();

	const {
		alertType,
		alertMessage,
		showAlert,
		alert
	} = useAlert();


	useEffect(() => {
		activateAccount(params.activationToken as string)
			.then(status => {
				if (status === StatusCodes.OK) {
					alert.show('warning',
						`A sua conta foi activada com sucesso.
							Faça login e comece a utilizar o nosso aplicativo.
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



	if (activatingAccount) {
		return (
			<Spinner
				loading={activatingAccount}
				text='Activando a conta...'
			/>
		);
	}


	return (
		<Alert
			variant={alertType}
			show={showAlert}
		>
			{alertMessage}
		</Alert>
	);

}
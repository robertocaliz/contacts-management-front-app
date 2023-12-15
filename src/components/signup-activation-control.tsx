'use client';

import useAlert from '@/hooks/use.alert';
import { StatusCodes } from 'http-status-codes';
import { useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import { useParams } from 'next/navigation';
import { activateAccount } from '@/app/actions/users';
import Container from './container';
import Centralize from './centralize';


export default function SinupActivationControl() {


	const params = useParams();

	const {
		alertType,
		alertMessage,
		alert
	} = useAlert();


	useEffect(() => {
		activateAccount(params.activationToken as string)
			.then(status => {
				if (status === StatusCodes.OK) {
					alert.show('success',
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
			.catch(error => {
				console.log(error);
			});
	}, []);


	return (
		<Container>
			<Centralize>
				<Alert variant={alertType}>
					{alertMessage ?? 'Analizando o token de activação...'}
				</Alert>
			</Centralize>
		</Container>
	);

}
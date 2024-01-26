'use client';

import Alert from 'react-bootstrap/Alert';
import Centralize from './centralize';
import useAlert from '@/hooks/use.alert';
import { useParams } from 'next/navigation';
import Container from './div';
import { useEffect } from 'react';
import { updateEmail } from '@/app/actions/users';
import { StatusCodes } from 'http-status-codes';
import { updateSessionUser } from '@/functions/session';

export default function EmailChangeConfirmationControl() {
	const params = useParams();

	const { alertType, alertMessage, alert } = useAlert();

	useEffect(() => {
		updateEmail(params.alterationToken as string)
			.then(async ({ status, newEmail }) => {
				if (status === StatusCodes.OK) {
					await updateSessionUser({ email: newEmail });
					return alert.show('success', 'Seu email foi alterado com sucesso!');
				}
				alert.show(
					'warning',
					`Token de alteração expirado ou invávildo.
						Solicite um novo token de alteração.`,
				);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<Container style={{ marginTop: '4rem', textAlign: 'center' }}>
			<Centralize>
				<Alert variant={alertType}>
					{alertMessage ?? <span>Analizando o token de alteração...</span>}
				</Alert>
			</Centralize>
		</Container>
	);
}

'use client';

import { useRouter } from 'next/navigation';
import errorHandlerStyles from '@/../styles/error-handler.module.css';
import Alert from 'react-bootstrap/Alert';
import { useEffect } from 'react';

type ErrorHandlerProps = {
	error: Error;
	reset: () => void;
};

function ErrorHandler({ error, reset }: ErrorHandlerProps) {
	const { push } = useRouter();

	useEffect(() => {
		console.log(error);
	}, [error]);

	return (
		<Alert variant='danger'>
			<main className={errorHandlerStyles.contentContainer}>
				<section>
					<p>Ops, ocorreu um erro!</p>
					<h5>Não foi possível executar o pedido. </h5>
					<p>
						Por favor, tente novamente ou contacte o suporte se o problema
						persistir.
					</p>
				</section>
				<section>
					<button onClick={() => reset()}>Tente novamente</button>
					<button onClick={() => push('/')}>
						&larr; Ir para página principal
					</button>
				</section>
			</main>
		</Alert>
	);
}

export default ErrorHandler;

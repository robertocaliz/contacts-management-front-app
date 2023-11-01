import Centralize from '@/components/centralize';
import { ParamsProps } from '@/types';
import { Metadata } from 'next';



export const metadata: Metadata = {
	title: 'Confirmar seu email'
};


export default function ConfirmSignupPage({ params }: ParamsProps) {
	const { email: userEmail } = params;
	return (<>
		<Centralize>
			<div>
				<h1>Confirme o seu email: {userEmail.replace('%40', '@')}</h1>
				<h2>Você receberá um link na sua inbox para confirmar seu cadastro e habilitar a sua conta.</h2>
			</div>
			<hr />
		</Centralize>
	</>);
}
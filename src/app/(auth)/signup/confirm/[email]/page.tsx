import Centralize from '@/components/centralize';
import { ParamsProps } from '@/types';
import { Metadata } from 'next';



export const metadata: Metadata = {
	title: 'Confira seu email'
};


export default function ConfirmSignupPage({ params }: ParamsProps) {
	const { email: userEmail } = params;
	return (<>
		<Centralize>
			<div style={{textAlign: 'center'}}>
				<h4>Confira seu email: {userEmail.replace('%40', '@')}</h4>
				<span>Você receberá um link na sua inbox para confirmar seu cadastro e habilitar a sua conta.</span>
			</div>
		</Centralize>
	</>);
}
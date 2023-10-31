import Centralize from '@/components/centralize';
import { Metadata } from 'next';



export const metadata: Metadata = {
	title: 'Confirmar seu email'
};


export default function ConfirmSignupPage() {
	return (<>
		<Centralize>
			<div>
				<h1>Confirme o seu email: robertocaliz@bancomoc.mz</h1>
				<h2>Você receberá um link para confirmar o seu cadastro e habilitar a sua conta.</h2>
			</div>
			<hr />
		</Centralize>
	</>);
}
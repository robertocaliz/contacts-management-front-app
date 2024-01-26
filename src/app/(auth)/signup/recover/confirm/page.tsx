import Centralize from '@/components/centralize';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Confira seu mail',
};

export default function ConfirmEmailPage() {
	return (
		<Centralize>
			<div className='text-center'>
				<h4>Confira o seu email</h4>
				<span>Você receberá um link para definir nova senha.</span>
			</div>
		</Centralize>
	);
}

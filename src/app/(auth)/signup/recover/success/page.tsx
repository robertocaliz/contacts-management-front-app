import Centralize from '@/components/centralize';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Signup recovered',
};

export default function SuccessPage() {
	return (
		<Centralize>
			<div className='text-center'>
				<h4>Senha alterada!</h4>
				<span>
					Faça login e continue usando o <strong>ContactsPro</strong>
				</span>
			</div>
		</Centralize>
	);
}

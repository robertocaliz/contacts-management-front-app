import Centralize from '@/components/centralize';
import FormHeader from '@/components/form-header';
import { ParamsProps } from '@/types';
import { Metadata } from 'next';


export const metadata:Metadata = {
	title: 'User profile'
};



export default function UserProfilePage({ params }: ParamsProps) {

	return (
		<Centralize>
			<form>
				<FormHeader text='Profile' />

			</form>
		</Centralize>
	);

}
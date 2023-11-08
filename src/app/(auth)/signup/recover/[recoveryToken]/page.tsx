import FormChangePassword from '@/components/form-change-password';
import { ParamsProps } from '@/types';
import { Metadata } from 'next';



export const metadata: Metadata = {
	title: 'Recuperar Senha'
};


export default function ChangePasswordPage({ params: { recoveryToken } }: ParamsProps) {

	return (
		<FormChangePassword
			recoveryToken={recoveryToken}
		/>
	);

}
import { useRouter } from 'next/navigation';
import { CSSProperties } from 'react';


const buttonBackStyles: CSSProperties = {

};


const ButtonBack = () => {
	const router = useRouter();
	return (
		<button
			style={buttonBackStyles}
			onClick={() => router.back()}
		>
			&larr;Voltar
		</button>
	);
};


export default ButtonBack;
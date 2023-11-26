import Link from 'next/link';
import { useRouter } from 'next/navigation';



const BackButton = () => {
	const router = useRouter();
	return (
		<Link
			href=''
			onClick={() => router.back()}
		>
			&larr;Voltar
		</Link>
	);
};


export default BackButton;
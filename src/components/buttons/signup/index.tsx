import Link from 'next/link';


const SignUpButton = ({ text = 'Cadastrar' }: { text?: string }) => {
	return (
		<Link href='/signup'>
			{text}
		</Link>
	);
};


export default SignUpButton;
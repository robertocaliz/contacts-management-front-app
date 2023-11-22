import Link from 'next/link';




export const LoginButton = ({ text = 'Login' }: { text?: string }) => {
	return (
		<Link href='/login'>
			{text}
		</Link>
	);
};



export default LoginButton;
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';



const LogoutButton = () => {
	const { replace } = useRouter();
	const onClick = () => {
		signOut({ redirect: false })
			.then(() => replace('/login'));
	};
	return (
		<Link
			href=''
			onClick={onClick}
		>
			<span>Logout</span>
		</Link>
	);
};


export default LogoutButton;
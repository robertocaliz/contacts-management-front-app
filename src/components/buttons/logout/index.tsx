import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';




const LogoutButton = () => {
	const { replace } = useRouter();
	const onClick = () => {
		signOut({ redirect: false })
			.then(() => replace('/login'));
	};
	return (
		<button
			onClick={onClick}
		>
			Logout
		</button>
	);
};


export default LogoutButton;
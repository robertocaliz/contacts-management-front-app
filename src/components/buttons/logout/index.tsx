import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { CSSProperties } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';



const LogoutButtonStyles: CSSProperties = {
	backgroundColor: 'transparent',
	color: '#F08080',
	border: '0',
	fontWeight: 'bold',
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	gap: '0.2rem'
};



const LogoutButton = () => {
	const { replace } = useRouter();
	const onClick = () => {
		signOut({ redirect: false })
			.then(() => replace('/login'));
	};
	return (
		<button
			onClick={onClick}
			style={LogoutButtonStyles}
		>
			<span>Logout</span>
			<AiOutlineLogout style={{ fontSize: '1.2rem' }} />
		</button>
	);
};


export default LogoutButton;
import Link from 'next/link';
import { ReactNode } from 'react';


type ProfileButtonProps = {
	content: string | ReactNode;
}

const UserProfileButton = ({ content }: ProfileButtonProps) => {
	return (
		<Link href='/profile'>
			{content}
		</Link>
	);
};


export default UserProfileButton;
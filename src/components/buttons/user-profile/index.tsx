import Link from 'next/link';
import { AnchorHTMLAttributes, ReactNode } from 'react';

type ProfileButtonProps = {
	_content: string | ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const UserProfileButton = ({ _content, ...rest }: ProfileButtonProps) => {
	return (
		<Link href='/profile' {...rest}>
			{_content}
		</Link>
	);
};

export default UserProfileButton;

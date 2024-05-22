import Link from 'next/link';
import { AnchorHTMLAttributes, ReactNode } from 'react';

type ProfileButtonProps = {
    _content: string | ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const ProfileButton = ({
    _content = 'Perfíl',
    ...props
}: ProfileButtonProps) => {
    return (
        <Link href='/profile' {...props}>
            {_content}
        </Link>
    );
};

export default ProfileButton;

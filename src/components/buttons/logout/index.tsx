import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AnchorHTMLAttributes } from 'react';

type LoginButtonProps = AnchorHTMLAttributes<HTMLAnchorElement>;

const LogoutButton = ({ ...rest }: LoginButtonProps) => {
    const { replace } = useRouter();
    const handleClick = () => {
        signOut({ redirect: false }).then(() => replace('/login'));
    };
    return (
        <Link href='' onClick={handleClick} {...rest}>
            Logout
        </Link>
    );
};

export default LogoutButton;

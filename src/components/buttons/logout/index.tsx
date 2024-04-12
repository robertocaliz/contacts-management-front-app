import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AnchorHTMLAttributes } from 'react';
import { MdLogout } from 'react-icons/md';

type LoginButtonProps = AnchorHTMLAttributes<HTMLAnchorElement>;

const LogoutButton = ({ ...rest }: LoginButtonProps) => {
    const { replace } = useRouter();
    const handleClick = () => {
        signOut({ redirect: false }).then(() => replace('/login'));
    };
    return (
        <Link
            href=''
            onClick={handleClick}
            {...rest}
            className='flex items-center gap-1 text-red-600'
        >
            <span>Logout</span>
            <MdLogout size={25} />
        </Link>
    );
};

export default LogoutButton;

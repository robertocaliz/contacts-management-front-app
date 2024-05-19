import Link from 'next/link';

import { BsPencil } from 'react-icons/bs';

type UpdateButtonProps = {
    path: string;
};

const UpdateButton = ({ path }: UpdateButtonProps) => {
    return (
        <Link
            className='inline-block rounded-full p-3 text-[1.3rem] font-bold hover:bg-sky-500  hover:text-white hover:duration-700 focus:bg-white focus:text-sky-500'
            href={path}
        >
            <BsPencil />
        </Link>
    );
};

export default UpdateButton;

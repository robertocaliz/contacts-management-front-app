import Link from 'next/link';

import { BsPencil } from 'react-icons/bs';

type UpdateButtonProps = {
	url: string;
};

const UpdateButton = ({ url }: UpdateButtonProps) => {
	return (
		<Link
			className='inline-block rounded-full p-3 text-[1.3rem] font-bold  hover:bg-sky-500 hover:text-white focus:bg-white focus:text-sky-500'
			href={url}
		>
			<BsPencil />
		</Link>
	);
};

export default UpdateButton;

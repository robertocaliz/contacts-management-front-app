import Link from 'next/link';

import { BsPencil } from 'react-icons/bs';

type UpdateButtonProps = {
	url: string;
};

const UpdateButton = ({ url }: UpdateButtonProps) => {
	return (
		<Link className='text-[1.3rem]' href={url}>
			<BsPencil />
		</Link>
	);
};

export default UpdateButton;

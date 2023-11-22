import Link from 'next/link';


import { BsPencil } from 'react-icons/bs';


type UpdateButtonProps = {
	url: string,
	size?: string
}


const UpdateButton = ({ url, size = '1.5rem' }: UpdateButtonProps) => {
	return (
		<Link
			href={url}
			style={{ fontSize: size }}
		>
			<BsPencil />
		</Link>
	);
};



export default UpdateButton;
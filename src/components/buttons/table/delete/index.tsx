import Spinner from '@/components/spinner';
import { CSSProperties, useTransition } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';




type DeleteButtonProps = {
	handleDelete: (id: string) => void;
	id: string;
}

const buttonDeleteStyles: CSSProperties = {
	color: '#F08080',
	fontSize: '1.5rem',
	border: 'none',
	backgroundColor: '#fff',
};

const DeleteButton = ({ handleDelete, id }: DeleteButtonProps) => {
	const [isPending, startTransition] = useTransition();
	return (
		<button
			style={buttonDeleteStyles}
			onClick={() => startTransition(() => handleDelete(id))}
		>
			{isPending ? (
				<Spinner loading={isPending} />
			) : (
				< RiDeleteBinLine />
			)}
		</button >
	);
};



export default DeleteButton;
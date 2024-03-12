import { TableHTMLAttributes } from 'react';

type TableProps = TableHTMLAttributes<HTMLTableElement>;

function Table({ ...rest }: TableProps) {
	return (
		<table
			{...rest}
			className='border-collaps h-full w-full min-w-[50rem] text-left'
		/>
	);
}

export default Table;

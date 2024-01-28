import { TableHTMLAttributes } from 'react';

type TableRowProps = TableHTMLAttributes<HTMLTableRowElement>;

function TableRow({ ...rest }: TableRowProps) {
	return <tr {...rest} className='hover:border hover:bg-gray-200' />;
}

export default TableRow;

import { TableHTMLAttributes } from 'react';

type TableHeaderProps = TableHTMLAttributes<HTMLTableCellElement>;

function TableHeader({ ...rest }: TableHeaderProps) {
	return <th {...rest} className='p-4 text-gray-800' />;
}

export default TableHeader;

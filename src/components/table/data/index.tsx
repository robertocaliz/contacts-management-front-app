import { TableHTMLAttributes } from 'react';

interface TableDataProps extends TableHTMLAttributes<HTMLTableCellElement> {}

function TableData({ ...rest }: TableDataProps) {
	return <td {...rest} className='px-4 py-2' />;
}

export default TableData;

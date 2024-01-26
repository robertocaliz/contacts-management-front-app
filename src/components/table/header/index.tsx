import { TableHTMLAttributes } from 'react';

type TableHeaderProps = TableHTMLAttributes<HTMLTableCellElement>;

function TableHeader({ ...rest }: TableHeaderProps) {
	return <th {...rest} />;
}

export default TableHeader;

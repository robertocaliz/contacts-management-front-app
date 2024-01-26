import { TableHTMLAttributes } from 'react';

type TableRowProps = TableHTMLAttributes<HTMLTableRowElement>;

function TableRow({ ...rest }: TableRowProps) {
	return <tr {...rest} />;
}

export default TableRow;

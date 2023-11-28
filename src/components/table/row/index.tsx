import { TableHTMLAttributes } from 'react';


interface TableRowProps extends TableHTMLAttributes<HTMLTableRowElement> { }

function TableRow({ ...rest }: TableRowProps) {
	return <tr {...rest}></tr>;

}

export default TableRow;
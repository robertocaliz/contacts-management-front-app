import { TableHTMLAttributes } from 'react';


interface TableDataProps extends TableHTMLAttributes<HTMLTableCellElement> { }

function TableData({ ...rest }: TableDataProps) {
	return <td {...rest}></td>;
}

export default TableData;
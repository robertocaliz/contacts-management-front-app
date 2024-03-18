import { TableHTMLAttributes } from 'react';

type TableRowProps = TableHTMLAttributes<HTMLTableRowElement>;

function TableRow({ ...rest }: TableRowProps) {
    return <tr {...rest} className='hover:bg-gray-100' />;
}

export default TableRow;

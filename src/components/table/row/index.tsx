import { TableHTMLAttributes } from 'react';

type TableRowProps = TableHTMLAttributes<HTMLTableRowElement>;

function TableRow({ ...rest }: TableRowProps) {
    return <tr {...rest} className='duration-150 hover:bg-gray-50' />;
}

export default TableRow;

import { TableHTMLAttributes } from 'react';

type TableRowProps = TableHTMLAttributes<HTMLTableRowElement>;

function TableRow({ ...rest }: TableRowProps) {
    return (
        <tr
            {...rest}
            className='duration-200 hover:bg-gray-50 dark:hover:text-medium'
        />
    );
}

export default TableRow;

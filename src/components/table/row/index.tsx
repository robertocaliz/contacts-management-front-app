import { TableHTMLAttributes } from 'react';

type TableRowProps = TableHTMLAttributes<HTMLTableRowElement>;

function TableRow({ ...props }: TableRowProps) {
    return (
        <tr
            {...props}
            className='duration-300 hover:bg-gray-50 dark:hover:text-medium'
        />
    );
}

export default TableRow;

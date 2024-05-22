import { TableHTMLAttributes } from 'react';

type TableHeaderProps = TableHTMLAttributes<HTMLTableCellElement>;

function TableHeader({ ...props }: TableHeaderProps) {
    return <th {...props} className='p-4 text-gray-800 dark:text-white' />;
}

export default TableHeader;

import { TableHTMLAttributes } from 'react';

interface TableDataProps extends TableHTMLAttributes<HTMLTableCellElement> {}

function TableData({ ...props }: TableDataProps) {
    return <td {...props} className='px-4 py-2' />;
}

export default TableData;

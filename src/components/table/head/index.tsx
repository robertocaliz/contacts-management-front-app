import { ReactNode, TableHTMLAttributes } from 'react';

type TableHead = {
    children: ReactNode;
} & TableHTMLAttributes<HTMLTableSectionElement>;

function TableHead({ children, ...props }: TableHead) {
    return <thead {...props}>{children}</thead>;
}

export default TableHead;

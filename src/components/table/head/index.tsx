import { ReactNode, TableHTMLAttributes } from 'react';

type TableHead = {
	children: ReactNode;
} & TableHTMLAttributes<HTMLTableSectionElement>;

function TableHead({ children, ...rest }: TableHead) {
	return <thead {...rest}>{children}</thead>;
}

export default TableHead;

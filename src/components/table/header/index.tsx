import { ReactNode, TableHTMLAttributes } from 'react';


type TableHeaderProps = {
	content?: ReactNode | string;
} & TableHTMLAttributes<HTMLTableCellElement>


function TableHeader({ content, ...rest }: TableHeaderProps) {
	return <th {...rest}>{content}</th>;
}

export default TableHeader;
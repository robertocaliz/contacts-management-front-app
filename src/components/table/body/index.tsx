import { ReactNode } from 'react';


type TableBodyProps = {
	children: ReactNode;
}


function TableBody({ children }: TableBodyProps) {
	return <tbody>{children}</tbody>;
}


export default TableBody;
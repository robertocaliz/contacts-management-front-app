import { TableHTMLAttributes } from 'react';


interface TableProps extends TableHTMLAttributes<HTMLTableElement> { }


function Table({ ...rest }: TableProps) {
	return <table {...rest}></table>;
}


export default Table;
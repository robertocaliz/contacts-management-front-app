import { TableHTMLAttributes } from 'react';

type TableProps = TableHTMLAttributes<HTMLTableElement>;

function Table({ ...rest }: TableProps) {
	return <table {...rest} />;
}

export default Table;

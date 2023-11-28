import { ReactNode } from 'react';


type TableHead = {
	children: ReactNode
}

function TableHead({ children }: TableHead) {
	return <thead>{children}</thead>;
}

export default TableHead;
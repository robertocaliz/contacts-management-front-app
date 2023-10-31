import { ReactNode } from 'react';


type MainProps = {
	children: ReactNode;
	margin?: string;
}


export default function Main({ children, margin = '2rem' }: MainProps) {
	return (
		<div style={
			{
				margin
			}
		}>
			{children}
		</div>
	);
}
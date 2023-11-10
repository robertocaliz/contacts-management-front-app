import { ReactNode } from 'react';


type CentralizeProps = {
	children: ReactNode;
	maxWidth?: string;
}


export default function Centralize({ children, maxWidth = '600px' }: CentralizeProps) {
	return (
		<div style={{
			maxWidth,
			margin: 'auto'
		}}>
			{children}
		</div>
	);
}
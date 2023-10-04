import { ReactNode } from "react";


export default function FormCenter({ children }: { children: ReactNode }) {
	return (
		<div style={{
			maxWidth: '500px',
			margin: 'auto'
		}}>
			{children}
		</div>
	)
}
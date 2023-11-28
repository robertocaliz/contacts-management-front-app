
import ClipLoader from 'react-spinners/ClipLoader';
import { CSSProperties } from 'react';



type SpinnerProps = {
	loading: boolean;
	text?: string;
}



const spinnerStyles: CSSProperties = {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '1rem'
};


export default function Spinner({ loading, text }: SpinnerProps) {
	return (
		<div style={spinnerStyles}>
			<ClipLoader
				color=" #0070f3"
				size={20}
				loading={loading}
			/>
			{text && (
				<span>{text}</span>
			)}
		</div>
	);
}
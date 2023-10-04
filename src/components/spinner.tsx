
import { CSSProperties, Dispatch, SetStateAction, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';



type SpinnerProps = {
	loading: boolean
}

export default function Spinner({ loading }: SpinnerProps) {
	return (
		<ClipLoader color="#52bfd9" size={20} loading={loading} />
	);
};
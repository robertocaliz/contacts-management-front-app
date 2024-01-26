import { ReactNode } from 'react';

type MainProps = {
	children: ReactNode;
	margin?: string;
};

export default function Main({ children }: MainProps) {
	return <div className='m-[2rem]'>{children}</div>;
}

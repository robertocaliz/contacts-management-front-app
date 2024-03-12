import { ReactNode } from 'react';

type CentralizeProps = {
	children: ReactNode;
};

export default function Centralize({ children }: CentralizeProps) {
	return <div className='m-auto max-w-[600px]'>{children}</div>;
}

import { ReactNode } from 'react';

type GlobalMainProps = {
    children: ReactNode;
};

export const GlobalMain = ({ children }: GlobalMainProps) => {
    return <div className='m-[2rem]'>{children}</div>;
};

import React, { ReactNode } from 'react';

type TableContainerProps = { children: ReactNode };

const TableContainer = ({ children }: TableContainerProps) => {
    return (
        <div className='mt-4 overflow-auto rounded-lg border-[0.13rem]'>
            {children}
        </div>
    );
};

export default TableContainer;

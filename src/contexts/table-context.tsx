'use client';

import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useState,
} from 'react';

type TableContextType = {
    totalRecords: number;
    setTotalRecords: Dispatch<SetStateAction<number>>;
    loadingPage: boolean;
    setLoadingPage: Dispatch<SetStateAction<boolean>>;
};

export const TableContext = createContext({} as TableContextType);

function TableProvider({ children }: { children: ReactNode }) {
    const [totalRecords, setTotalRecords] = useState(0);
    const [loadingPage, setLoadingPage] = useState(true);

    return (
        <TableContext.Provider
            value={{
                totalRecords,
                loadingPage,
                setTotalRecords,
                setLoadingPage,
            }}
        >
            {children}
        </TableContext.Provider>
    );
}

export default TableProvider;

'use client';

import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useState,
} from 'react';

type TableContextType = {
    searchParams: {
        page: number;
        per_page: number;
        filter: string;
        criteria: string;
        getAll: () => string;
        setPage: Dispatch<SetStateAction<number>>;
        setPerPage: Dispatch<SetStateAction<number>>;
        setFilter: Dispatch<SetStateAction<string>>;
        setCriteria: Dispatch<SetStateAction<string>>;
    };
    tablePage: {
        totalRecords: number;
        setTotalRecords: Dispatch<SetStateAction<number>>;
        isLoading: boolean;
        setIsLoading: Dispatch<SetStateAction<boolean>>;
    };
};

export const TableContext = createContext({} as TableContextType);

function TableProvider({ children }: { children: ReactNode }) {
    const [totalRecords, setTotalRecords] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const [page, setPage] = useState<number>(1);
    const [per_page, setPerPage] = useState<number>(5);
    const [filter, setFilter] = useState<string>('');
    const [criteria, setCriteria] = useState<string>('name');

    const getAll = () => {
        return `page=${page}&
				per_page=${per_page}&
				filter=${filter}&
				&criteria=${criteria}`;
    };

    return (
        <TableContext.Provider
            value={{
                tablePage: {
                    totalRecords,
                    isLoading,
                    setTotalRecords,
                    setIsLoading,
                },
                searchParams: {
                    page,
                    per_page,
                    filter,
                    criteria,
                    getAll,
                    setPage,
                    setPerPage,
                    setFilter,
                    setCriteria,
                },
            }}
        >
            {children}
        </TableContext.Provider>
    );
}

export default TableProvider;

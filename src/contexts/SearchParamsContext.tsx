'use client';

import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useState,
} from 'react';

type SearchParamsContextType = {
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
};

export const SearchParamsContext = createContext({} as SearchParamsContextType);

const SearchParamsProvider = ({ children }: { children: ReactNode }) => {
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
        <SearchParamsContext.Provider
            value={{
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
        </SearchParamsContext.Provider>
    );
};

export default SearchParamsProvider;

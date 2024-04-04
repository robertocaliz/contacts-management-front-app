import Spinner from './spinner';
import { useContext } from 'react';
import { TableContext } from '@/contexts/TableContext';

export const PaginationControls = () => {
    const { tablePage, searchParams } = useContext(TableContext);

    const pages = Math.ceil(
        tablePage.totalRecords / Number(searchParams.per_page),
    );

    const handleNextPageClick = () => {
        tablePage.setIsLoading(!tablePage.isLoading);
        searchParams.setPage((page) => ++page);
    };

    const handlePrevPageClick = () => {
        tablePage.setIsLoading(!tablePage.isLoading);
        searchParams.setPage((page) => --page);
    };

    return (
        <>
            <div className='mt-4 flex flex-wrap items-center justify-center gap-4'>
                <button
                    className='rounded bg-sky-500 px-3 py-1 font-bold text-white hover:bg-sky-600 focus:border-[0.15rem] focus:border-sky-100'
                    disabled={searchParams.page == 1 ? true : false}
                    onClick={handlePrevPageClick}
                >
                    Anterior
                </button>
                {tablePage.isLoading ? (
                    <Spinner loading={tablePage.isLoading} />
                ) : (
                    <div className='flex gap-2 dark:text-white'>
                        <span>
                            {tablePage.totalRecords === 0
                                ? 0
                                : searchParams.page}
                        </span>
                        <span> /</span>
                        <span>{pages}</span>
                    </div>
                )}
                <button
                    className='rounded bg-sky-500 px-3 py-1 font-bold text-white hover:bg-sky-600 focus:border-[0.15rem] focus:border-sky-100'
                    disabled={searchParams.page == pages ? true : false}
                    onClick={handleNextPageClick}
                >
                    Próxima
                </button>
            </div>
        </>
    );
};

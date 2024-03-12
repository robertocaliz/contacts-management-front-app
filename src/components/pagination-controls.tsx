import Spinner from './spinner';
import { useContext } from 'react';
import { TableContext } from '@/contexts/table-context';
import { SearchParamsContext } from '@/contexts';

function PaginationControls() {
    const { totalRecords, loadingPage, setLoadingPage } =
        useContext(TableContext);

    const { searchParams } = useContext(SearchParamsContext);

    const pages = Math.ceil(totalRecords / Number(searchParams.per_page));

    const handleNextPageClick = () => {
        setLoadingPage(true);
        searchParams.setPage((page) => ++page);
    };

    const handlePrevPageClick = () => {
        setLoadingPage(true);
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
                {loadingPage ? (
                    <Spinner loading={loadingPage} />
                ) : (
                    <span>
                        {totalRecords === 0 ? 0 : searchParams.page} / {pages}
                    </span>
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
}

export default PaginationControls;

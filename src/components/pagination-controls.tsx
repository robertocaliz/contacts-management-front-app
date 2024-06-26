import { useRouter } from 'next/navigation';
import Spinner from './spinner';
import { useContext } from 'react';
import { TableContext } from '@/contexts/table-context';
import { useTableSearchParams } from '@/hooks/useTableSearchParams';
import Div from './div';

function PaginationControls() {
	const router = useRouter();

	const { totalRecords, loadingPage, setLoadingPage } =
		useContext(TableContext);

	const {
		values: { page, per_page },
	} = useTableSearchParams();

	const pages = Math.ceil(totalRecords / Number(per_page));

	const handleNextPageClick = () => {
		setLoadingPage(true);
		router.push(`?page=${Number(page) + 1}&per_page=${per_page}`);
	};

	const handlePrevPageClick = () => {
		setLoadingPage(true);
		router.push(`?page=${Number(page) - 1}&per_page=${per_page}`);
	};

	return (
		<>
			<Div className='mt-4 flex flex-wrap items-center justify-center gap-4'>
				<button
					className='rounded bg-sky-500 px-3 py-1 font-bold text-white hover:bg-sky-600 focus:border-[0.15rem] focus:border-sky-100'
					disabled={page == 1 ? true : false}
					onClick={handlePrevPageClick}
				>
					Anterior
				</button>
				{loadingPage ? (
					<Spinner loading={loadingPage} />
				) : (
					<span>
						{totalRecords === 0 ? 0 : page} / {pages}
					</span>
				)}
				<button
					className='rounded bg-sky-500 px-3 py-1 font-bold text-white hover:bg-sky-600 focus:border-[0.15rem] focus:border-sky-100'
					disabled={page == pages ? true : false}
					onClick={handleNextPageClick}
				>
					Próxima
				</button>
			</Div>
		</>
	);
}

export default PaginationControls;



import paginationControlsStyles from '@/../styles/pagination-controls.module.css';
import { useRouter } from 'next/navigation';
import Spinner from './spinner';
import { useContext } from 'react';
import { TableContext } from '@/contexts/table-context';
import { useTableSearchParams } from '@/hooks/useTableSearchParams';
import Container from './container';




function PaginationControls() {


	const router = useRouter();
	const { totalRecords, loadingPage } = useContext(TableContext);

	const {
		values: { page, per_page }
	} = useTableSearchParams();

	
	const pages = Math.ceil(totalRecords / Number(per_page));


	return (
		<>
			<Container className={paginationControlsStyles.container}>
				<button
					className={paginationControlsStyles.control}
					disabled={page == 1 ? true : false}
					onClick={() => router.push(`?page=${Number(page) - 1}&per_page=${per_page}`)}>
					Anterior
				</button>
				{loadingPage ? (
					<Spinner
						loading={loadingPage}
					/>
				) : (
					<span>
						{(totalRecords === 0 ? 0 : page)} / {pages}
					</span>
				)}
				<button
					className={paginationControlsStyles.control}
					disabled={page == pages ? true : false}
					onClick={() => router.push(`?page=${Number(page) + 1}&per_page=${per_page}`)}>
					Próxima
				</button>
			</Container>
		</>
	);
}

export default PaginationControls;
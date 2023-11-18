import paginationControlsStyles from '@/../styles/pagination-controls.module.css';
import { useRouter, useSearchParams } from 'next/navigation';
import Spinner from './spinner';
import { PER_PAGE } from '@/constants';


type PaginationControlsProps = {
	totalRecords: number;
	pageLoading?: boolean;
}


function PaginationControls({ totalRecords, pageLoading }: PaginationControlsProps) {

	const searchParams = useSearchParams();
	const router = useRouter();

	const page = searchParams.get('page') ?? 1;
	const per_page = searchParams.get('per_page') ?? PER_PAGE;
	const pages = Math.ceil(totalRecords / Number(per_page));

	return (
		<>
			<div className={paginationControlsStyles.container}>
				<button
					className={paginationControlsStyles.control}
					disabled={page == 1 ? true : false}
					onClick={() => router.push(`?page=${Number(page) - 1}&per_page=${per_page}`)}
				>
					Anterior
				</button>
				{pageLoading ? (
					<Spinner
						loading={pageLoading}
					/>
				) : (
					<span>
						{page} / {pages}
					</span>
				)}
				<button
					className={paginationControlsStyles.control}
					disabled={page == pages ? true : false}
					onClick={() => router.push(`?page=${Number(page) + 1}&per_page=${per_page}`)}
				>
					Próxima
				</button>
			</div>
		</>
	);
}

export default PaginationControls;
import paginationControlsStyles from '@/../styles/pagination-controls.module.css';
import { useRouter, useSearchParams } from 'next/navigation';
import Spinner from './spinner';


type PaginationControlsProps = {
	count: number;
	pageLoading?: boolean;
}


function PaginationControls({ count, pageLoading }: PaginationControlsProps) {

	const searchParams = useSearchParams();
	const router = useRouter();

	const page = searchParams.get('page') ?? 1;
	const pages = Math.ceil(count / 5);

	return (
		<>
			<div className={paginationControlsStyles.container}>
				<button
					className={paginationControlsStyles.control}
					disabled={page == 1 ? true : false}
					onClick={() => router.push(`?page=${Number(page) - 1}`)}
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
					onClick={() => router.push(`?page=${Number(page) + 1}`)}
				>
					Próximo
				</button>
			</div>
		</>
	);
}

export default PaginationControls;
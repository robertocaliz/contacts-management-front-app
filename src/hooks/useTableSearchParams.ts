
import { useSearchParams } from 'next/navigation';



const NUMBER_OF_REGISTERS_PER_PAGE = 5;


type TableSearchParamsProps = {
	_page?: number;
	_per_page?: number;
	_filter?: string;
};


export const useTableSearchParams = () => {


	const searchParams = useSearchParams();


	const page = Number(searchParams.get('page') ?? 1);
	const per_page = searchParams.get('per_page') ?? NUMBER_OF_REGISTERS_PER_PAGE;
	const filter = searchParams.get('filter') ?? '';


	const currentTableSearchParams = ({
		_page,
		_per_page,
		_filter
	}: TableSearchParamsProps) => {
		return `page=${_page ?? page}&
				per_page=${_per_page ?? per_page}&
				filter=${_filter ?? filter}`;
	};

	
	return {
		currentTableSearchParams,
		values: {
			page,
			per_page,
			filter
		}
	};

	
};
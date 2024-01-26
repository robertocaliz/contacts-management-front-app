
import { useSearchParams } from 'next/navigation';



const NUMBER_OF_REGISTERS_PER_PAGE = 5;


type CurrentSearchParamsProps = {
	_page?: number;
	_per_page?: number;
	_filter?: string;
	_criteria?: string;
};


export const useTableSearchParams = () => {


	const searchParams = useSearchParams();


	const page = Number(searchParams.get('page') ?? 1);
	const per_page = searchParams.get('per_page') ?? NUMBER_OF_REGISTERS_PER_PAGE;
	const filter = searchParams.get('filter') ?? '';
	const criteria = searchParams.get('criteria');


	const currentTableSearchParams = ({
		_page,
		_per_page,
		_filter,
	}: CurrentSearchParamsProps) => {
		return `page=${_page ?? page}&
				per_page=${_per_page ?? per_page}&
				filter=${_filter ?? filter}&
				${criteria && `criteria=${criteria}`}`;
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
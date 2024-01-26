import { ONE_SECOND } from '@/constants';
import { TableContext } from '@/contexts/table-context';
import wait from '@/lib/wait';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useContext, useState } from 'react';
import Input from './input';
import { FaSearch } from 'react-icons/fa';
import Div from './div';

function SearchBar() {
	const router = useRouter();
	const [criteria] = useState('email');
	const { setLoadingPage } = useContext(TableContext);

	const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
		setLoadingPage(true);
		await wait(ONE_SECOND).then(() => {
			router.replace(`?filter=${e.target.value}&criteria=${criteria}`);
		});
	};

	return (
		<Div className='flex-grow-[6] flex-wrap-reverse justify-between'>
			<Input
				type='search'
				endAdornment={<FaSearch className='text-gray-800' />}
				onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
			/>
		</Div>
	);
}

export default SearchBar;

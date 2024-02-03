import { ONE_SECOND } from '@/constants';
import { TableContext } from '@/contexts/table-context';
import wait from '@/lib/wait';
import { ChangeEvent, HtmlHTMLAttributes, useContext, useState } from 'react';
import Input from './input';
import { FaSearch } from 'react-icons/fa';
import Div from './div';
import Select from './Select';
import { FaFilter } from 'react-icons/fa';
import { SelectT } from '@/types';
import { useRouter } from 'next/navigation';

type SearchBarProps = {
	select: SelectT;
} & HtmlHTMLAttributes<HTMLDivElement>;

function SearchBar({ select, ...rest }: SearchBarProps) {
	const router = useRouter();
	const { setLoadingPage } = useContext(TableContext);
	const [criteria, setCriteria] = useState(select.defaultValue);

	const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
		setLoadingPage(true);
		await wait(ONE_SECOND).then(() => {
			return router.replace(`?filter=${e.target.value}&criteria=${criteria}`);
		});
	};

	return (
		<Div {...rest}>
			<Div className='flex flex-wrap-reverse items-center gap-4'>
				<Div className='flex-grow-[8]'>
					<Input
						type='search'
						startAdornment={<FaSearch className='text-gray-800' />}
						onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearch(e)}
					/>
				</Div>
				<Div className='flex-grow-[2]'>
					<Select
						options={select.options}
						startAdornment={<FaFilter />}
						onChange={(e: ChangeEvent<HTMLSelectElement>) =>
							setCriteria(e.target.value)
						}
					/>
				</Div>
			</Div>
		</Div>
	);
}

export default SearchBar;

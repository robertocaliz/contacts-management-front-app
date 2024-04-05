import { ONE_SECOND } from '@/constants';
import wait from '@/lib/wait';
import { ChangeEvent, HtmlHTMLAttributes, useContext } from 'react';
import { FaSearch } from 'react-icons/fa';
import { SelectOption } from '@/types';
import { TableContext } from '@/contexts';
import { Input, Select } from './form';

type SearchBarProps = {
    selectOptions: SelectOption[];
} & HtmlHTMLAttributes<HTMLDivElement>;

export const SearchBar = ({ selectOptions, ...rest }: SearchBarProps) => {
    const { tablePage, searchParams } = useContext(TableContext);

    const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
        tablePage.setIsLoading(true);
        await wait(ONE_SECOND).then(() => {
            searchParams.setFilter(e.target.value);
        });
    };

    return (
        <div {...rest}>
            <div className='flex flex-wrap-reverse items-center gap-4'>
                <div className='flex-grow-[8]'>
                    <Input
                        type='text'
                        startAdornment={
                            <FaSearch className='text-gray-800 dark:text-white' />
                        }
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleSearch(e)
                        }
                    />
                </div>
                <div className='relative bottom-[0.06rem] flex-grow-[2]'>
                    <Select
                        options={selectOptions}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                            searchParams.setCriteria(e.target.value)
                        }
                    />
                </div>
            </div>
        </div>
    );
};

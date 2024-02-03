'use client';

import PaginationControls from './pagination-controls';
import TableRow from './table/row';
import Table from './table';
import TableHeader from './table/header';
import TableHead from './table/head';
import TableBody from './table/body';
import SearchBar from './SearchBar';
import ButtonAdd from './button-add';
import ContactPage from './contact-page';
import { FaPhone } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import Div from './div';
import TableContainer from './table-container';
import { SelectOption } from '@/types';

export default function ContactTable() {
	const selectOptions: SelectOption[] = [
		{ value: 'name', content: 'Nome' },
		{ value: 'email', content: 'E-mail' },
		{ value: 'phoneNumber', content: 'Telefone' },
	];

	return (
		<>
			<Div className='flex flex-wrap-reverse items-center justify-between gap-12'>
				<SearchBar
					select={{ options: selectOptions, defaultValue: 'name' }}
					className='flex-grow-[8]'
				/>
				<Div className='flex-grow-[2]'>
					<ButtonAdd href='/contacts/add' />
				</Div>
			</Div>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableHeader>Nome</TableHeader>
							<TableHeader>
								<Div className='flex items-center gap-2'>
									<span>Email</span>
									<SiGmail />
								</Div>
							</TableHeader>
							<TableHeader>
								<Div className='flex items-center gap-2'>
									<span>Telefone</span>
									<FaPhone />
								</Div>
							</TableHeader>
							<TableHeader />
							<TableHeader />
						</TableRow>
					</TableHead>
					<TableBody>
						<ContactPage />
					</TableBody>
				</Table>
			</TableContainer>
			<PaginationControls />
		</>
	);
}

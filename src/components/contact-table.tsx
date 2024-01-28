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

export default function ContactTable() {
	return (
		<>
			<Div className='flex flex-wrap-reverse items-center justify-between gap-3'>
				<SearchBar />
				<ButtonAdd href='/contacts/add' />
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
								<Div className='flex items-center gap-1'>
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

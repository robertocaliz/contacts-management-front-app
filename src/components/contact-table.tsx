'use client';

import PaginationControls from './pagination-controls';
import TableRow from './table/row';
import Table from './table';
import TableHeader from './table/header';
import TableHead from './table/head';
import TableBody from './table/body';
import Div from './div';
import SearchBar from './SearchBar';
import ButtonAdd from './button-add';
import ContactPage from './contact-page';
import { FaPhone } from 'react-icons/fa';

export default function ContactTable() {
	return (
		<>
			<Div className='flex flex-wrap-reverse items-center justify-between gap-3'>
				<SearchBar />
				<ButtonAdd
					className='rounded-full bg-green-500 px-5 py-[0.8rem] font-bold text-white hover:bg-green-600 focus:border-[0.6rem] focus:border-green-100'
					href='/contacts/add'
				/>
			</Div>
			<Div className='mt-4 overflow-auto rounded-lg border-[0.13rem]'>
				<Table className='border-collaps h-full w-full min-w-[50rem] text-left'>
					<TableHead>
						<TableRow>
							<TableHeader className='p-4 text-gray-800'>Nome</TableHeader>
							<TableHeader className='p-4 text-gray-800'>Email</TableHeader>
							<TableHeader className='flex items-center gap-2 p-4 text-gray-800'>
								<span>Telefone</span>
								<FaPhone />
							</TableHeader>
							<TableHeader className='p-3 text-gray-800' />
							<TableHeader className='p-3 text-gray-800' />
						</TableRow>
					</TableHead>
					<TableBody>
						<ContactPage />
					</TableBody>
				</Table>
			</Div>
			<PaginationControls />
		</>
	);
}

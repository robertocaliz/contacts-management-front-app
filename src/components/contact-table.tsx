'use client';

import tableContactsStyles from '@/../styles/contact-table.module.css';
import PaginationControls from './pagination-controls';
import ContactPage from './contact-page';
import TableRow from './table/row';
import Table from './table';
import TableHeader from './table/header';
import TableHead from './table/head';
import TableBody from './table/body';
import Container from './container';
import Input from './input';
import { ButtonAdd } from './buttons.component';
import utilsStyles from '@/../styles/utils.module.css';
import { BiSearch } from 'react-icons/bi';
import { ChangeEvent, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { useTableSearchParams } from '@/hooks/useTableSearchParams';
import wait from '@/lib/wait';
import { TableContext } from '@/contexts/table-context';
import { ONE_SECOND } from '@/constants';


export default function ContactTable() {


	const router = useRouter();


	const { currentTableSearchParams } = useTableSearchParams();
	const { setLoadingPage } = useContext(TableContext);



	const searchContacts = async (e: ChangeEvent<HTMLInputElement>) => {
		setLoadingPage(true);
		await wait(ONE_SECOND)
			.then(() => {
				router.replace(`?${currentTableSearchParams({
					_filter: e.target.value
				})}`);
			});
	};


	return (
		<>
			<Container className={utilsStyles.flexContainer}>
				<Input
					type='search'
					name='search'
					placeholder='Pesquisar contacto'
					endAdornment={<BiSearch />}
					onChange={(e) => searchContacts(e as ChangeEvent<HTMLInputElement>)}
					style={{
						maxWidth: '70rem',
						flexGrow: 6
					}}
				/>
				<ButtonAdd
					href='/contacts/add'
				/>
			</Container>
			<Container className={tableContactsStyles.tableContainer}>
				<Table>
					<TableHead>
						<TableRow className={tableContactsStyles.headerRow} >
							<TableHeader content='Nome' />
							<TableHeader content='Email' />
							<TableHeader content='Telefone/Telemóvel' />
							<TableHeader />
							<TableHeader />
						</TableRow>
					</TableHead>
					<TableBody>
						<ContactPage />
					</TableBody>
				</Table>
			</Container >
			<PaginationControls />
		</>
	);
}
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


export default function ContactTable() {
	return (
		<>
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
'use client';

import tableContactsStyles from '@/../styles/contact-table.module.css';
import PaginationControls from './pagination-controls';
import Contacts from './contacts';
import { useContext } from 'react';
import { TableContext } from '@/contexts/table-context';

export default function TableContacts() {
	
	const { totalRecords, loadingPage } = useContext(TableContext);

	return (
		<>
			<div className={tableContactsStyles.tableContainer}>
				<table>
					<thead>
						<tr className={tableContactsStyles.headerRow}>
							<th>Nome</th>
							<th>Email</th>
							<th>Telefone/Telemóvel</th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<Contacts />
					</tbody>
				</table>
			</div >
			<PaginationControls
				totalRecords={totalRecords}
				pageLoading={loadingPage}
			/>
		</>
	);

}
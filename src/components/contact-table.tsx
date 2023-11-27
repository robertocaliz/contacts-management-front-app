'use client';

import tableContactsStyles from '@/../styles/contact-table.module.css';
import PaginationControls from './pagination-controls';
import ContactPage from './contact-page';



export default function ContactTable() {
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
						<ContactPage />
					</tbody>
				</table>
			</div >
			<PaginationControls />
		</>
	);
}
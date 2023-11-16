'use client';

import tableContactsStyles from '@/../styles/contact-table.module.css';
import { useFetch, useSubmitButton } from '@/hooks';
import { Contact, GetAllResBody, Id } from '@/types';
import { FormEvent, useEffect, useState } from 'react';
import { DeleteButton, UpdateButton } from './buttons.component';
import Alerts from '@/lib/alerts';
import { ContactsProvider } from '@/lib/providers/contacts';
import { GLOBAL_ERROR_MESSAGE } from '@/constants';
import Alert from 'react-bootstrap/Alert';
import useAlert from '@/hooks/use.alert';
import PaginationControls from './pagination-controls';
import { useSearchParams } from 'next/navigation';


export default function TableContacts() {

	const [contacts, setContacts] = useState<Contact[]>([]);
	
	const searchParams = useSearchParams();

	const {
		alertType,
		alertMessage,
		showAlert,
		alert
	} = useAlert();

	const {
		buttonState: { runSpinner },
		submitButton
	} = useSubmitButton();


	const {
		data,
		error,
	} = useFetch<GetAllResBody<Contact>>(`/contacts?page=${searchParams.get('page') ?? 1}`);



	useEffect(() => {
		if (data?.objs) setContacts(data.objs);
	}, [data]);


	if (error) {
		return <Alert variant='danger' show={true}>{GLOBAL_ERROR_MESSAGE}</Alert>;
	}


	const removeContactFromTable = (contactId: Id) => {
		setContacts(contacts.filter(contact => contact._id !== contactId));
	};


	const handleDelete = async (e: FormEvent, contactId: Id) => {
		e.preventDefault();
		submitButton.runSpinner();
		await ContactsProvider
			.del(contactId)
			.then(() => {
				removeContactFromTable(contactId);
				Alerts.success('Contacto apagado.');
			})
			.catch(() => {
				alert.show('danger',
					GLOBAL_ERROR_MESSAGE);
			})
			.finally(() => {
				submitButton.interruptSpinner();
			});
	};


	return (
		<>
			<Alert variant={alertType} show={showAlert}>{alertMessage}</Alert>
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
						{contacts.map(contact => (
							<tr key={contact._id}>
								<td>{contact.name}</td>
								<td>{contact.email}</td>
								<td>{contact.phoneNumber}</td>
								<td>
									<DeleteButton
										handleDelete={(e) => handleDelete(e, contact._id)}
										runSpinner={runSpinner}
									/>
								</td>
								<td>
									<UpdateButton
										url={`/contacts/${contact._id}/update`}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div >
			<PaginationControls count={data?.count as number} />
		</>
	);
}
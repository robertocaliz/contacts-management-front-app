'use client';


import tableContactsStyles from '@/../styles/contact-table.module.css';
import { useFetch } from '@/hooks';
import { Contact, Id } from '@/types';
import Spinner from './spinner';
import { FormEvent, useEffect, useState } from 'react';
import { DeleteButton, UpdateButton } from './buttons.component';
import Alerts from '@/lib/alerts';
import { useRouter } from 'next/navigation';
import { ContactsProvider } from '@/lib/providers/contacts';
import { GLOBAL_ERROR_MESSAGE } from '@/constants';
import Alert from 'react-bootstrap/Alert';


export default function TableContacts() {

	const { push } = useRouter();
	const [contacts, setContacts] = useState<Contact[]>([]);

	const [pageNumber, setPageNumber] = useState(1);

	const {
		data,
		isLoading,
		error
	} = useFetch<Contact[]>(`/contacts?page=${pageNumber}`);

	useEffect(() => {
		if (data) setContacts(data);
	}, [data]);


	// if (isLoading) {
	// 	return <Spinner loading={isLoading} text='Loading contacts...' />;
	// }

	if (error) {
		return <Alert variant='danger' show={true}>{GLOBAL_ERROR_MESSAGE}</Alert>;
	}

	const removeContactFromTable = (contactId: Id) => {
		setContacts(contacts.filter(contact => contact._id !== contactId));
	};


	const handleDelete = async (e: FormEvent, contactId: Id) => {
		e.preventDefault();
		await ContactsProvider
			.del(contactId)
			.then(() => {
				removeContactFromTable(contactId);
				Alerts.success('Contacto apagado.');
			})
			.catch(() => {
				Alerts.error('Ocorreu um erro.');
			});
	};

	const handleUpdate = (e: FormEvent, contactId: Id) => {
		e.preventDefault();
		push(`/contacts/${contactId}/update`);
	};

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
						{!isLoading && (
							contacts.map(contact => (
								<tr key={contact._id} onDoubleClick={(e) => handleUpdate(e, contact._id)}>
									<td>{contact.name}</td>
									<td>{contact.email}</td>
									<td>{contact.phoneNumber}</td>
									<td>
										<DeleteButton handleDelete={(e) => handleDelete(e, contact._id)} />
									</td>
									<td>
										<UpdateButton handleUpdate={(e) => handleUpdate(e, contact._id)} />
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div >
			<div style={{ textAlign: 'center' }}>
				<button onClick={() => setPageNumber(pageNumber - 1)}>Anterior</button>
				<button onClick={() => setPageNumber(pageNumber + 1)}>Próxima</button>
			</div>
		</>
	);
}
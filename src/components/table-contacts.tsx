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



export default function TableContacts() {
	const { push } = useRouter();
	const [contacts, setContacts] = useState<Contact[]>([]);

	const {
		data,
		isLoading,
		error
	} = useFetch<Contact[]>('/contacts');


	useEffect(() => {
		if (data) setContacts(data);
	}, [data]);


	if (error) {
		return <h1>Error!</h1>;
	}

	if (isLoading) {
		return <Spinner loading={isLoading} text='Loading contacts...' />;
	}

	const removeContactFromTable = (contactId: Id) => {
		setContacts(contacts.filter(contact => contact.id !== contactId));
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
		<div className={tableContactsStyles.tableContainer}>
			<table>
				<thead>
					<tr className={tableContactsStyles.headerRow}>
						<th>ID</th>
						<th>Nome</th>
						<th>Email</th>
						<th>Telefone/Telemóvel</th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{contacts.map(contact => (
						<tr key={contact.id} onDoubleClick={(e) => handleUpdate(e, contact.id)}>
							<td>{contact.id}</td>
							<td>{contact.name}</td>
							<td>{contact.email}</td>
							<td>{contact.phoneNumber}</td>
							<td>
								<DeleteButton handleDelete={(e) => handleDelete(e, contact.id)} />
							</td>
							<td>
								<UpdateButton handleUpdate={(e) => handleUpdate(e, contact.id)} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div >
	);
}
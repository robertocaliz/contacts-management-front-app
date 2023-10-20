'use client';


import tableContactsStyles from '@/../styles/contact-table.module.css';
import { useFetch } from '@/hooks';
import { Contact } from '@/types';
import Spinner from './spinner';
import { FormEvent, useEffect, useState } from 'react';
import { DeleteButton, UpdateButton } from './buttons.component';
import { StatusCodes } from 'http-status-codes';
import Alerts from '@/lib/alerts';
import { useRouter } from 'next/navigation';



export default function TableContacts() {
	const { push } = useRouter();
	const [contacts, setContacts] = useState<Contact[]>([]);

	const {
		data,
		isLoading,
		error
	} = useFetch<Contact[]>('/api/contacts');


	useEffect(() => {
		setContacts(data);
	}, [data]);


	if (error) {
		return <h1>Error!</h1>;
	}


	if (isLoading) {
		return <Spinner loading={true} text='Loading contacts...' />;
	}

	const removeContactFromTable = (contactId: number) => {
		setContacts(contacts.filter(contact => contact.id !== contactId));
	};

	const handleDelete = async (e: FormEvent, contactId: number) => {
		e.preventDefault();
		const response = await fetch(`/api/contacts/${contactId}`,
			{
				method: 'DELETE'
			});
		const body = await response.json();
		if (response.status === StatusCodes.OK) {
			removeContactFromTable(contactId);
			Alerts.success(body.message);
			return;
		}
		Alerts.error(body.message);
	};


	const handleUpdate = (e: FormEvent, contactId: number) => {
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
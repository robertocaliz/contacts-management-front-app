
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
		isLoading
	} = useFetch<Contact[]>('/api/contacts');


	useEffect(() => {
		setContacts(data ?? [])
	}, [data])


	if (isLoading) {
		return <Spinner loading={true} text='Loading contacts...' />
	}

	const removeContactFromTable = (contactId: number) => {
		setContacts(contacts.filter(contact => contact.id !== contactId));
	}

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
	}


	const handleUpdate = (e: FormEvent, contactId: number) => {
		push(`/contacts/${contactId}/update`);
	}

	return (
		<div className={tableContactsStyles.tableContainer}>
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Email</th>
						<th>Phone number</th>
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
	)
}
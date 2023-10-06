
'use client';


import tableContactsStyles from '@/../styles/contact-table.module.css';
import { useFetch } from '@/hooks';
import { Contact } from '@/types';
import Spinner from './spinner';
import { useState } from 'react';
import { DeleteButton, UpdateButton } from './buttons.component';


export default function TableContacts() {

	const [loading, setLoading] = useState(true);

	const {
		data: contacts
	} = useFetch<Contact[]>('/api/contacts');


	if (!contacts) {
		return <Spinner loading={loading} text='Loading contacts...' />
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
						<tr key={contact.id}>
							<td>{contact.id}</td>
							<td>{contact.name}</td>
							<td>{contact.email}</td>
							<td>{contact.phoneNumber}</td>
							<td>
								<DeleteButton />
							</td>
							<td>
								<UpdateButton />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div >
	)
}
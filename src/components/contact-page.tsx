import { deleteById, getAll } from '@/app/actions/contact';
import { useFetch } from '@/hooks';
import { Contact, GetAllResponse } from '@/types';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import Alerts from '@/lib/alerts';
import DeleteButton from './buttons/table/delete';
import { TableContext } from '@/contexts/table-context';
import UpdateButton from './buttons/table/update';
import TableData from './table/data';
import TableRow from './table/row';
import { useTableSearchParams } from '@/hooks/useTableSearchParams';

function ContactPage() {
	const router = useRouter();
	const [contacts, setContacts] = useState<Contact[]>([]);
	const { setTotalRecords, setLoadingPage } = useContext(TableContext);

	const {
		currentTableSearchParams,
		values: { page, per_page },
	} = useTableSearchParams();

	const { data, error, mutate } = useFetch<GetAllResponse>(
		`/contacts?${currentTableSearchParams({})}`,
		getAll,
	);

	useEffect(() => {
		if (data) {
			setLoadingPage(false);
			setTotalRecords(data.count);
			setContacts(data.contacts);
		}
	}, [data]);

	if (error) {
		throw error;
	}

	const migrateToPrevPage = () => {
		if (contacts.length - 1 === 0 && page > 1) {
			router.push(`?page=${Number(page) - 1}&per_page${per_page}`);
			return true;
		}
		false;
	};

	const removeContactFromTable = (contactId: string) => {
		setContacts(contacts.filter((contact) => contact._id !== contactId));
	};

	const handleDelete = async (contactId: string) => {
		const deleteContact = confirm('Realmente quer apagar o contacto?');
		if (deleteContact) {
			await deleteById(contactId);
			removeContactFromTable(contactId);
			const migrate = migrateToPrevPage();
			if (!migrate) {
				mutate();
			}
			Alerts.success('Contacto apagado.');
		}
	};

	return (
		<>
			{contacts.map((contact) => (
				<TableRow key={contact._id} className='hover:border hover:bg-gray-200'>
					<TableData className='p-2'>{contact.name}</TableData>
					<TableData className='p-2'>{contact.email}</TableData>
					<TableData className='p-2'>{contact.phoneNumber}</TableData>
					<TableData className='p-2'>
						<DeleteButton handleDelete={handleDelete} id={contact._id} />
					</TableData>
					<TableData className='p-2'>
						<UpdateButton url={`/contacts/${contact._id}/update`} />
					</TableData>
				</TableRow>
			))}
		</>
	);
}

export default ContactPage;

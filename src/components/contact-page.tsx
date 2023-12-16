import { deleteById, getAll } from '@/app/actions/contact';
import { PER_PAGE } from '@/constants';
import { useFetch } from '@/hooks';
import { Contact, UseFetchData } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import Alerts from '@/lib/alerts';
import DeleteButton from './buttons/table/delete';
import { TableContext } from '@/contexts/table-context';
import UpdateButton from './buttons/table/update';
import TableData from './table/data';
import TableRow from './table/row';
import { Link } from './hyper-link';


function ContactPage() {

	const { setTotalRecords, setLoadingPage } = useContext(TableContext);
	const [contacts, setContacts] = useState<Contact[]>([]);
	const { push } = useRouter();

	const searchParams = useSearchParams();
	const page = searchParams.get('page') ?? 1;
	const per_page = searchParams.get('per_page') ?? PER_PAGE;

	const {
		data,
		error,
		mutate
	} = useFetch<UseFetchData<Contact>>(
		`/contacts?page=${page}&per_page=${per_page}`,
		getAll
	);

	useEffect(() => {
		if (data) {
			setLoadingPage(false);
			setTotalRecords(data.count);
			setContacts(data.objs);
		}
	}, [data]);

	if (error) {
		throw error;
	}

	const migrateToPrevPage = () => {
		if ((contacts.length - 1) === 0 && Number(page) > 1) {
			push(`?page=${Number(page) - 1}&per_page${per_page}`);
			return true;
		}
		false;
	};

	const removeContactFromTable = (contactId: string) => {
		setContacts(contacts.filter(contact => contact._id !== contactId));
	};

	const handleDelete = async (contactId: string) => {
		await deleteById(contactId);
		removeContactFromTable(contactId);
		const migrate = migrateToPrevPage();
		if (!migrate) {
			mutate();
		}
		Alerts.success('Contacto apagado.');
	};

	return (
		<>
			{contacts.map(contact => (
				<TableRow key={contact._id}>
					<TableData>
						{contact.name}
					</TableData>
					<TableData>
						<Link
							onClick={() => push(`mailto:${contact.email}`)}>
							{contact.email}
						</Link>
					</TableData>
					<TableData>
						{contact.phoneNumber}
					</TableData>
					<TableData>
						<DeleteButton
							handleDelete={handleDelete}
							id={contact._id}
						/>
					</TableData>
					<TableData>
						<UpdateButton
							url={`/contacts/${contact._id}/update`}
						/>
					</TableData>
				</TableRow >
			))}
		</>
	);
}

export default ContactPage;
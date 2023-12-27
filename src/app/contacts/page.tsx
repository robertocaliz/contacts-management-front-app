import { Metadata } from 'next';
import TableProvider from '@/contexts/table-context';
import ContactTable from '@/components/contact-table';
import HeaderH2 from '@/components/header/header-h2';


export const metadata: Metadata = {
	title: 'Contatos'
};


export default function ContactsPage() {
	return (
		<>
			<HeaderH2
				text='Listagem de contactos'
				style={{
					marginBottom: '1.1rem'
				}}
			/>
			<section>
				<TableProvider>
					<ContactTable />
				</TableProvider>
			</section>
		</>
	);
}
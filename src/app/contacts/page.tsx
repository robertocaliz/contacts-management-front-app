import { ButtonAdd } from '@/components/buttons.component';
import utilsStyles from '@/../styles/utils.module.css';
import Input from '@/components/input';
import { BiSearch } from 'react-icons/bi';
import { Metadata } from 'next';
import HeaderH2 from '@/components/header/header-h2';
import TableProvider from '@/contexts/table-context';
import ContactTable from '@/components/contact-table';


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
			<section className={utilsStyles.flexContainer}>
				<Input
					type='search'
					name='search'
					placeholder='Pesquisar'
					endAdornment={<BiSearch />}
					style={{
						maxWidth: '70rem',
						flexGrow: 6
					}}
				/>
				<ButtonAdd
					href='/contacts/add'
				/>
			</section>
			<section>
				<TableProvider>
					<ContactTable />
				</TableProvider>
			</section>
		</>
	);
}
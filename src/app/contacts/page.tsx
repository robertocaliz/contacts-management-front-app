import { ButtonAdd } from '@/components/buttons.component';
import utilsStyles from '@/../styles/utils.module.css';
import Input from '@/components/input';
import { BiSearch } from 'react-icons/bi';
import TableContacts from '@/components/table-contacts';
import { Metadata } from 'next';
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
				<TableContacts />
			</section>
		</>
	);
}
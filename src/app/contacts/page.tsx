import { ButtonAdd, ButtonBack } from '@/components/buttons.component';
import utilsStyles from '@/../styles/utils.module.css';
import Input from '@/components/input';
import { BiSearch } from 'react-icons/bi'
import TableContacts from '@/components/table-contacts';


export default function ContactsPage() {

	return (
		<>
			<ButtonBack />
			<section className={utilsStyles.flexSpaceBetween}>
				<Input
					type='search'
					name='search'
					startAdornment={<BiSearch />}
				/>
				<ButtonAdd />
			</section>
			<section>
				<TableContacts />
			</section>
		</>
	)
}
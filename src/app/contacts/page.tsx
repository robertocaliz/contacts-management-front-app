import tableStyles from '@/../styles/contact-table.module.css';
import { ButtonAdd, ButtonBack } from '@/components/buttons.component';
import utilsStyles from '@/../styles/utils.module.css';
import Input from '@/components/input';
import { BiSearch } from 'react-icons/bi'
import { APP_ROUTES } from '@/constants/app-routes';

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
				<ButtonAdd
					href={APP_ROUTES.private.contacts.add}
				/>
			</section>
			<section>
				<div className={tableStyles.tableContainer}>
					<table>
						<thead>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Email</th>
								<th>Phone number</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>1</td>
								<td>Roberto Caliz</td>
								<td>robertocaliz72@gmail.com</td>
								<td>844215602</td>
							</tr>
						</tbody>
						<tfoot>

						</tfoot>
					</table>
				</div >
			</section>
		</>
	)
}
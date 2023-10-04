import tableStyles from '@/../styles/contact-table.module.css';
import { AddButton } from '@/components/buttons.component';
import utilsStyles from '@/../styles/utils.module.css';


export default function ContactsPage() {
	return (
		<>
			<section className={utilsStyles.flexSpaceBetween} style={{ marginBottom: '2rem' }}>
				<input type="search" name="" id="" />
				<AddButton />
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
'use client';

import navStyles from '@/../styles/nav.module.css';
import { useSession } from "next-auth/react";
import {
	ContactsButton, HomeButton, LoginButton, LogoutButton, SignUpButton, ProfileButton
} from "./buttons.component";
import { User } from '@/types';
import { BsPersonGear } from 'react-icons/bs';


export default function Nav() {

	const { data: session } = useSession();
	const user = session?.user as User;

	return (
		<nav className={navStyles.nav} >
			<section>
				<ul>
					<li>
						<HomeButton />
					</li>
					{session && (
						<li>
							<ContactsButton />
						</li>
					)}

				</ul>
			</section>
			<section style={{ paddingRight: '2rem' }}>
				<ul>
					{session ? (
						<>
							<li><LogoutButton /></li>
							<li><ProfileButton userId={user.id} content={<BsPersonGear />} /></li>
						</>
					) : (
						<>
							<li><LoginButton /></li>
							<li><SignUpButton /></li>
						</>
					)}
				</ul>
			</section>
		</nav>
	);
}
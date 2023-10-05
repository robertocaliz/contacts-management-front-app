'use client';

import Link from "next/link";
import utilsStyles from '@/../styles/nav.module.css';
import { useSession } from "next-auth/react";
import { ContactsButton, HomeButton, LoginButton, LogoutButton, SignUpButton, UserButton } from "./buttons.component";
import { APP_ROUTES } from "@/constants/app-routes";




export default function Nav() {

	const { data: session, status } = useSession();

	console.log(session);

	if (status === 'loading') {
		return;
	}

	return (
		<div className={utilsStyles.navContainer} >
			<section>
				<ul>
					<li>
						<HomeButton />
					</li>

					{session && (
						<li>
							<ContactsButton href={APP_ROUTES.private.contacts.list} />
						</li>
					)}

				</ul>
			</section>
			<section style={{ paddingRight: '2rem' }}>
				<ul>
					{session ? (
						<>
							<li><LogoutButton /></li>
							<li><UserButton content={session.user?.name as string} /></li>
						</>
					) : (
						<>
							<li><LoginButton href={APP_ROUTES.public.login} /></li>
							<li><SignUpButton href={APP_ROUTES.public.signup} /></li>
						</>
					)}
				</ul>
			</section>
		</div>
	)
}
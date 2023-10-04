'use client';

import Link from "next/link";
import utilsStyles from '../../styles/utils.module.css';
import { useSession } from "next-auth/react";
import { LoginButton, LogoutButton, SignUpButton, UserButton } from "./buttons.component";
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
					<li><Link href='/'>Home</Link></li>
					<li><Link href='/'>Contacts</Link></li>
				</ul>
			</section>
			<section>
				<ul>
					<li>

						{session ? (
							<>
								<LogoutButton />
								<UserButton username={session.user?.name as string} />
							</>
						) : (
							<>
								<LoginButton href={APP_ROUTES.public.login} />
								<SignUpButton href={APP_ROUTES.public.signup} />
							</>
						)}

					</li>
				</ul>
			</section>
		</div>
	)
}
'use client';

import Link from "next/link";
import utilsStyles from '../../styles/utils.module.css';
import { useSession } from "next-auth/react";
import { LoginButton, LogoutButton, ProfileButton } from "./buttons.component";




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
								<ProfileButton username={session.user?.name as string} />
							</>
						) : (
							<>
								<LoginButton />
								<Link href='/'>Sig up</Link>
							</>
						)}

					</li>
				</ul>
			</section>
		</div>
	)
}
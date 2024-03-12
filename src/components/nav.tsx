'use client';

import { useSession } from 'next-auth/react';
import HomeButton from './buttons/home';
import LogoutButton from './buttons/logout';
import LoginButton from './buttons/login';
import SignUpButton from './buttons/signup';
import ContactsButton from './buttons/contacts';
import UserProfileButton from './buttons/user-profile';
import { CgProfile } from 'react-icons/cg';

export default function Nav() {
	const { data: session } = useSession();

	return (
		<nav className='flex justify-between bg-gray-800 px-4 py-2 font-bold'>
			<ul className='flex items-center gap-4'>
				<li>
					<HomeButton className='flex items-center gap-2 text-white' />
				</li>
				{session && (
					<li>
						<ContactsButton className='text-white' />
					</li>
				)}
			</ul>
			<ul className='flex items-center gap-4'>
				{session ? (
					<>
						<li>
							<LogoutButton className='text-white' />
						</li>
						<li>
							<UserProfileButton
								className='text-[1.5rem] text-white'
								_content={<CgProfile />}
							/>
						</li>
					</>
				) : (
					<>
						<li>
							<LoginButton />
						</li>
						<li>
							<SignUpButton />
						</li>
					</>
				)}
			</ul>
		</nav>
	);
}

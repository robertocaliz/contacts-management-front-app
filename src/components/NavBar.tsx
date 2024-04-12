'use client';

import { useSession } from 'next-auth/react';
import HomeButton from './buttons/home';
import LogoutButton from './buttons/logout';
import LoginButton from './buttons/login';
import SignUpButton from './buttons/signup';
import ContactsButton from './buttons/contacts';
import ProfileButton from './buttons/user-profile';
import { CgProfile } from 'react-icons/cg';
import { ToggleTheme } from '@/components';
import { TiContacts } from 'react-icons/ti';
import { Caveat } from 'next/font/google';

const caveat = Caveat({ subsets: ['latin'], weight: ['700'] });

export const NavBar = () => {
    const { data: session } = useSession();
    return (
        <nav className='flex justify-between bg-gray-800 px-[1.8rem] py-[0.75rem] font-bold'>
            <ul className='flex items-center gap-4'>
                <li>
                    <HomeButton
                        content$={
                            <div className='flex items-center gap-2'>
                                <TiContacts size={28} />
                                <span
                                    className={`${caveat.className} text-[1rem]`}
                                >
                                    ContactsPro
                                </span>
                            </div>
                        }
                        className='flex items-center gap-2 text-white'
                    />
                </li>
                {session && (
                    <li>
                        <ContactsButton className='text-white' />
                    </li>
                )}
            </ul>
            <ul className='mr-2 flex items-center gap-4'>
                {session ? (
                    <>
                        <li>
                            <ProfileButton
                                className='text-[1.5rem] text-white'
                                _content={<CgProfile />}
                            />
                        </li>
                        <li>
                            <LogoutButton className='text-white' />
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <LoginButton className='text-white' />
                        </li>
                        <li>
                            <SignUpButton />
                        </li>
                    </>
                )}
                <li>
                    <ToggleTheme />
                </li>
            </ul>
        </nav>
    );
};

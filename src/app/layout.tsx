import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../../styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nunito_Sans } from 'next/font/google';
import NextAuthSessionProvider from '@/contexts/NextAuthContext';
import { GlobalFooter, GlobalMain, NavBar, ProgressBar } from '@/components';

const nunito_Sans = Nunito_Sans({ subsets: ['latin-ext'], weight: '500' });

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang='en'>
            <body
                className={`${nunito_Sans.className} dark:bg-medium dark:text-white`}
            >
                <NextAuthSessionProvider>
                    <ProgressBar />
                    <NavBar />
                    <GlobalMain>{children}</GlobalMain>
                    <GlobalFooter />
                    <ToastContainer />
                </NextAuthSessionProvider>
            </body>
        </html>
    );
}

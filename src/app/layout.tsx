import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from '@/components/nav';
import '../../styles/global.css';
import Footer from '@/components/footer';
import Main from '@/components/main';
import ProgressBar from '@/components/progress-bar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nunito_Sans } from 'next/font/google';
import NextAuthSessionProvider from '@/contexts/NextAuthContext';

const nunito_Sans = Nunito_Sans({ subsets: ['latin'], weight: '500' });

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang='en'>
			<body className={nunito_Sans.className}>
				<NextAuthSessionProvider>
					<ProgressBar />
					<Nav />
					<Main>{children}</Main>
					<Footer />
					<ToastContainer />
				</NextAuthSessionProvider>
			</body>
		</html>
	);
}

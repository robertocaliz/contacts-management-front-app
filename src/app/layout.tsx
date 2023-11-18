import { ReactNode } from 'react';
import NextAuthContext from '@/contexts/next-auth-context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from '@/components/nav';
import '../../styles/global.css';
import Footer from '@/components/footer';
import Main from '@/components/main';
import ProgressBar from '@/components/progress-bar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Centralize from '@/components/centralize';
import { Inter } from 'next/font/google';


const inter = Inter({ subsets: ['latin'], weight: '400' });


export default function RootLayout({
	children,
}: {
	children: ReactNode
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<NextAuthContext>
					<ProgressBar />
					<Nav />
					<Main>
						{children}
						<Centralize>
							<hr />
						</Centralize>
					</Main>
					<Footer />
					<ToastContainer />
				</NextAuthContext>
			</body>
		</html>
	);
}

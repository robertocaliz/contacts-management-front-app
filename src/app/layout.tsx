import { ReactNode } from 'react';
import NextAuthContext from '@/contexts/next-auth-context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from '@/components/nav';
import '../../styles/global.css';
import Footer from '@/components/footer';
import Main from '@/components/main';
import ProgressBar from '@/components/progress-bar';

export default function RootLayout({
	children,
}: {
	children: ReactNode
}) {

	return (
		<html lang="en">
			<body>
				<NextAuthContext>
					<ProgressBar />
					<Nav />
					<Main>
						{children}
					</Main>
					<Footer />
					<ToastContainer />
				</NextAuthContext>
			</body>
		</html>
	);
}

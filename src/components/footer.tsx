import Link from 'next/link';

export default function Footer() {
	return (
		<footer>
			<ul className='flex justify-center gap-3 pb-[3rem] pt-[1rem]'>
				<li>
					<Link href={process.env.PROJECT_REPOSITORY as string} target='_blank'>
						GitHub
					</Link>
				</li>
				<li>
					<Link href='/'>Sobre</Link>
				</li>
				<li>
					<Link href='/'>Desenvolvedor</Link>
				</li>
				<li>
					<Link href='/terms-of-use'>Termos de uso</Link>
				</li>
			</ul>
		</footer>
	);
}

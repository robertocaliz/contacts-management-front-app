import Link from 'next/link';

export default function Notfound() {
    return (
        <div className='flex flex-col items-center gap-3'>
            <h1 className='text-7xl font-bold text-teal-500'>404</h1>
            <p className='text-2xl font-bold'>A página não foi encontrada.</p>
            <p className='text-1xl'>
                Clique <Link href='/'>aqui</Link> para ir a página inicial.
            </p>
        </div>
    );
}

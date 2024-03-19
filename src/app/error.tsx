'use client';

import { useRouter } from 'next/navigation';
import Alert from 'react-bootstrap/Alert';
import { useEffect } from 'react';
import { VscBracketError } from 'react-icons/vsc';
import { IoIosHome } from 'react-icons/io';

type ErrorHandlerProps = {
    error: Error;
    reset: () => void;
};

function ErrorHandler({ error, reset }: ErrorHandlerProps) {
    const { push } = useRouter();

    useEffect(() => {
        console.log(error);
    }, [error]);

    return (
        <Alert variant='danger'>
            <main className='text-center'>
                <section className='my-[2rem] flex flex-col gap-4'>
                    <p className='flex items-center justify-center gap-3'>
                        <VscBracketError size={30} />
                        <span>Ops, ocorreu um erro!</span>
                    </p>
                    <h1 className='text-[1.2rem] font-bold'>
                        Não foi possível executar o pedido.
                    </h1>
                    <p>
                        Por favor, tente novamente ou contacte o suporte se o
                        problema persistir.
                    </p>
                </section>
                <section className='flex flex-wrap justify-center gap-4'>
                    <button
                        className='rounded-md bg-green-600 px-4 py-3 text-sm font-bold text-white duration-500 hover:bg-green-700'
                        onClick={() => reset()}
                    >
                        Tente novamente
                    </button>
                    <button
                        className='rounded-md bg-blue-300 px-9 py-3 text-[0.8rem] text-sm font-bold duration-500 hover:bg-blue-400'
                        onClick={() => push('/')}
                    >
                        <IoIosHome size={22} />
                    </button>
                </section>
            </main>
        </Alert>
    );
}

export default ErrorHandler;

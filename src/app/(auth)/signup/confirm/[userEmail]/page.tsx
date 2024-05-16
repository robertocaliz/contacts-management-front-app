import { Centralize } from '@/components';
import { ParamsProps } from '@/types';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Confira seu email',
};

export default function ConfirmSignup({ params }: ParamsProps) {
    return (
        <>
            <Centralize>
                <div className='flex flex-col gap-2 text-center'>
                    <p>
                        <span>Confira seu email: </span>
                        <span className='font-bold text-gray-700 dark:text-white'>
                            {params.userEmail.replace('%40', '@')}
                        </span>
                    </p>
                    <p>
                        Você receberá um link na sua inbox para confirmar seu
                        cadastro e habilitar a sua conta.
                    </p>
                </div>
            </Centralize>
        </>
    );
}

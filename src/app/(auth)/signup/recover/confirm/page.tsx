import { Centralize } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Confira seu mail',
};

export default function ConfirmEmailPage() {
    return (
        <Centralize>
            <div className='flex flex-col gap-2 text-center'>
                <span className='font-bold text-gray-700 dark:text-white'>
                    Confira o seu email!
                </span>
                <span>Você receberá um link para definir nova senha.</span>
            </div>
        </Centralize>
    );
}

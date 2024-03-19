import Centralize from '@/components/centralize';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Confira seu mail',
};

export default function ConfirmEmailPage() {
    return (
        <Centralize>
            <div className='flex flex-col gap-2 text-center'>
                <span>
                    <strong className='text-gray-700'>
                        Confira o seu email!
                    </strong>
                </span>
                <span>Você receberá um link para definir nova senha.</span>
            </div>
        </Centralize>
    );
}

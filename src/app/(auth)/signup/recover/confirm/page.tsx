import Centralize from '@/components/centralize';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Confira seu mail',
};

export default function ConfirmEmailPage() {
    return (
        <Centralize>
            <div className='flex flex-col gap-2 text-center'>
                <span>Confira o seu email</span>
                <span>Você receberá um link para definir nova senha.</span>
            </div>
        </Centralize>
    );
}

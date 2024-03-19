import Centralize from '@/components/centralize';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Signup recovered',
};

export default function SuccessPage() {
    return (
        <Centralize>
            <div className='flex flex-col gap-2 text-center'>
                <span>Senha alterada!</span>
                <span>
                    Faça login e continue usando o <strong>ContactsPro</strong>
                </span>
            </div>
        </Centralize>
    );
}

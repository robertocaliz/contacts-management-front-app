import Centralize from '@/components/centralize';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Signup recovered',
};

export default function SuccessPage() {
    return (
        <Centralize>
            <div className='flex flex-col gap-2 text-center'>
                <span className='font-bold'>Senha alterada!</span>
                <div>
                    <span>Faça login ou continue usando o </span>
                    <span className='font-bold'>ContactsPro.</span>
                </div>
            </div>
        </Centralize>
    );
}

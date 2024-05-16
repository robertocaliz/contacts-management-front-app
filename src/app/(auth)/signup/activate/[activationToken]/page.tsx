import { SignupActivationControl } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Activar conta',
};

export default function ActivateUserAcount() {
    return <SignupActivationControl />;
}

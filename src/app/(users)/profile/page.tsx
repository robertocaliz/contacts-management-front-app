import { ProfileForm } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Perfíl do utilizador',
};

export default function ProfilePage() {
    return <ProfileForm />;
}

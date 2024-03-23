import { Metadata } from 'next';
import { ContactTable } from '@/components';
import { TableProvider } from '@/contexts';

export const metadata: Metadata = {
    title: 'Contatos',
};

export default function ContactsPage() {
    return (
        <>
            <section>
                <TableProvider>
                    <ContactTable />
                </TableProvider>
            </section>
        </>
    );
}

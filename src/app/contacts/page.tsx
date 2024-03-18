import { Metadata } from 'next';
import TableProvider from '@/contexts/TableContext';
import ContactTable from '@/components/contact-table';

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

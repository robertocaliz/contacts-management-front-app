import { Metadata } from 'next';
import TableProvider from '@/contexts/table-context';
import ContactTable from '@/components/contact-table';
import SearchParamsProvider from '@/contexts/SearchParamsContext';

export const metadata: Metadata = {
    title: 'Contatos',
};

export default function ContactsPage() {
    return (
        <>
            <section>
                <TableProvider>
                    <SearchParamsProvider>
                        <ContactTable />
                    </SearchParamsProvider>
                </TableProvider>
            </section>
        </>
    );
}

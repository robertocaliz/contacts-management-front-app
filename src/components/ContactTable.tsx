'use client';

import TableRow from './table/row';
import Table from './table';
import TableHeader from './table/header';
import TableHead from './table/head';
import TableBody from './table/body';
import { PaginationControls, TableContainer } from '@/components';
import { useFetch } from '@/hooks';
import { Contact, FetchData } from '@/types';
import { deleteById, fetchContacts } from '../../server/actions/contacts';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import DeleteButton from './buttons/table/delete';
import UpdateButton from './buttons/table/update';
import TableData from './table/data';
import { TableContext } from '@/contexts';
import { migrateToPrevPage } from '@/functions/tables';
import Alerts from '@/lib/alerts';
import { HookResult } from 'next-safe-action/hooks';
import Alert from 'react-bootstrap/Alert';

export const ContactTable: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const { tablePage, searchParams } = useContext(TableContext);

    const {
        data: result,
        mutate,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } = useFetch<HookResult<any, FetchData<Contact>>>(
        `/contacts?${searchParams.getAll()}`,
        fetchContacts,
    );

    useEffect(() => {
        if (result?.data) {
            tablePage.setIsLoading(false);
            tablePage.setTotalRecords(result.data.count);
            setContacts(result.data.items);
        }
    }, [result]);

    if (result?.serverError) {
        return (
            <Alert variant='danger' show={true}>
                {result.serverError}
            </Alert>
        );
    }

    const removeContactFromPage = (contactId: string) => {
        setContacts(contacts.filter((contact) => contact._id !== contactId));
    };

    const handleDeleteContact = async (contactId: string) => {
        const { serverError } = await deleteById({ _id: contactId });
        if (serverError) {
            return Alerts.error(serverError);
        }
        removeContactFromPage(contactId);
        Alerts.success('Contacto apagado.');

        const migrate = migrateToPrevPage(contacts.length, searchParams.page);
        if (migrate) {
            return searchParams.setPage((page) => --page);
        }

        mutate();
    };

    return (
        <main>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeader>Nome</TableHeader>
                            <TableHeader>Email</TableHeader>
                            <TableHeader>Telefone</TableHeader>
                            <TableHeader />
                            <TableHeader />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contacts.map((contact) => (
                            <TableRow key={contact._id}>
                                <TableData>{contact.name}</TableData>
                                <TableData>
                                    <Link href={`mailto:${contact.email}`}>
                                        {contact.email}
                                    </Link>
                                </TableData>
                                <TableData>{contact.phoneNumber}</TableData>
                                <TableData>
                                    <DeleteButton
                                        handleDelete={handleDeleteContact}
                                        id={contact._id}
                                    />
                                </TableData>
                                <TableData>
                                    <UpdateButton
                                        path={`/contacts/${contact._id}`}
                                    />
                                </TableData>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <PaginationControls />
        </main>
    );
};

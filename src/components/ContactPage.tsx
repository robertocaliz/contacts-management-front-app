'use client';

import { useFetch } from '@/hooks';
import { Contact, GetAllResponse } from '@/types';
import { useContext, useEffect, useState } from 'react';
import Alerts from '@/lib/alerts';
import DeleteButton from './buttons/table/delete';
import { TableContext } from '@/contexts/TableContext';
import UpdateButton from './buttons/table/update';
import TableData from './table/data';
import TableRow from './table/row';
import { migrateToPrevPage } from '@/functions/tables';
import Link from 'next/link';
import { fetchContacts, deleteById } from '../../server/actions/contacts';

export const ContactPage = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const { tablePage, searchParams } = useContext(TableContext);

    const { data, error, mutate } = useFetch<GetAllResponse>(
        `/contacts?${searchParams.getAll()}`,
        fetchContacts,
    );

    useEffect(() => {
        if (data) {
            tablePage.setIsLoading(false);
            tablePage.setTotalRecords(data.count);
            setContacts(data.contacts);
        }
    }, [data]);

    if (error) {
        throw error;
    }

    const removeContactFromPage = (contactId: string) => {
        setContacts(contacts.filter((contact) => contact._id !== contactId));
    };

    const handleDelete = async (contactId: string) => {
        await deleteById({ id: contactId })
            .then(({ serverError }) => {
                return Promise.reject(serverError);
            })
            .then(() => {
                removeContactFromPage(contactId);
                Alerts.success('Contacto apagado.');
            })
            .then(() => {
                const migrate = migrateToPrevPage(
                    contacts.length,
                    searchParams.page,
                );
                if (migrate) {
                    searchParams.setPage((page) => --page);
                    return;
                }
                mutate();
            })
            .catch((serverError) => {
                Alerts.error(serverError);
            });
    };

    return (
        <>
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
                            handleDelete={handleDelete}
                            id={contact._id}
                        />
                    </TableData>
                    <TableData>
                        <UpdateButton url={`/contacts/${contact._id}`} />
                    </TableData>
                </TableRow>
            ))}
        </>
    );
};

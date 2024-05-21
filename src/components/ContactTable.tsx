'use client';

import TableRow from './table/row';
import Table from './table';
import TableHeader from './table/header';
import TableHead from './table/head';
import TableBody from './table/body';
import {
    Contacts,
    CreateButton,
    PaginationControls,
    SearchBar,
    TableContainer,
} from '@/components';
import { useFetch } from '@/hooks';
import { Contact, FetchData } from '@/types';
import { deleteById, fetchContacts } from '../../server/actions/contacts';
import { useCallback, useContext, useEffect, useState } from 'react';
import { TableContext } from '@/contexts';
import { migrateToPrevPage } from '@/functions/tables';
import Alerts from '@/lib/alerts';
import { HookResult } from 'next-safe-action/hooks';
import Alert from 'react-bootstrap/Alert';
import { CONTACT_SEARCH_CRITERIAS } from '@/constants';

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

    const handleDelete = useCallback(
        async (contactId: string) => {
            const { serverError } = await deleteById({ _id: contactId });
            if (serverError) {
                return Alerts.error(serverError);
            }
            removeContactFromPage(contactId);
            Alerts.success('Contacto apagado.');

            const migrate = migrateToPrevPage(
                contacts.length,
                searchParams.page,
            );
            if (migrate) {
                return searchParams.setPage((page) => --page);
            }

            mutate();
        },
        [contacts],
    );

    return (
        <div>
            <div className='flex flex-wrap-reverse items-center gap-4'>
                <div className='flex-grow-[7]'>
                    <SearchBar searchCriterias={CONTACT_SEARCH_CRITERIAS} />
                </div>
                <div className='flex-grow-[2]'>
                    <CreateButton path='/contacts/create' />
                </div>
            </div>
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
                        <Contacts
                            contacts={contacts}
                            handleDelete={handleDelete}
                        />
                    </TableBody>
                </Table>
            </TableContainer>
            <PaginationControls />
        </div>
    );
};

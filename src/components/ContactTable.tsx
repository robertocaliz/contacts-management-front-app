'use client';

import TableRow from './table/row';
import Table from './table';
import TableHeader from './table/header';
import TableHead from './table/head';
import TableBody from './table/body';
import { SelectOption } from '@/types';
import {
    AddButton,
    ContactPage,
    PaginationControls,
    SearchBar,
    TableContainer,
} from '@/components';

export const ContactTable = () => {
    const selectOptions: SelectOption[] = [
        { value: 'name', content: 'Nome' },
        { value: 'email', content: 'E-mail' },
        { value: 'phoneNumber', content: 'Telefone' },
    ];
    return (
        <>
            <div className='flex flex-wrap-reverse items-center justify-between gap-12'>
                <SearchBar
                    selectOptions={selectOptions}
                    className='flex-grow-[8]'
                />
                <div className='flex flex-grow-[1] items-center gap-4'>
                    <AddButton href='/contacts/add' />
                </div>
            </div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeader>Nome</TableHeader>
                            <TableHeader>
                                <div className='flex items-center gap-2'>
                                    <span>Email</span>
                                </div>
                            </TableHeader>
                            <TableHeader>Telefone</TableHeader>
                            <TableHeader />
                            <TableHeader />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <ContactPage />
                    </TableBody>
                </Table>
            </TableContainer>
            <PaginationControls />
        </>
    );
};

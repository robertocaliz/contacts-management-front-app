import { Contact } from '@/types';
import Link from 'next/link';
import { DeleteButton } from './buttons/table/delete';
import UpdateButton from './buttons/table/update';
import TableData from './table/data';
import TableRow from './table/row';
import { memo } from 'react';

interface ContactsProps {
    contacts: Contact[];
    handleDelete: (id: string) => void;
}

const ContactsFC = ({ contacts, handleDelete }: ContactsProps) => {
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
                        <UpdateButton path={`/contacts/${contact._id}`} />
                    </TableData>
                </TableRow>
            ))}
        </>
    );
};

export const Contacts = memo(ContactsFC);

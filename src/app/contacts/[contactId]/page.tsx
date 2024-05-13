import { Centralize, FormUpdateContact } from '@/components';
import { Metadata } from 'next';
import { getById } from '../../../../server/actions/contacts';
import { Contact, ParamsProps } from '@/types';
import Alert from 'react-bootstrap/Alert';

export const metadata: Metadata = {
    title: 'Actualizar contacto',
};

export default async function UpdateContactPage({ params }: ParamsProps) {
    const { data, serverError } = await getById({ _id: params.contactId });
    return serverError ? (
        <Centralize>
            <Alert variant='danger' show={true}>
                {serverError}
            </Alert>
        </Centralize>
    ) : (
        <FormUpdateContact data={data as Contact} />
    );
}

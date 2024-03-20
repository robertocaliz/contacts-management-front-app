'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Alerts from '@/lib/alerts';
import { useRouter } from 'next/navigation';
import Centralize from './centralize';
import FormHeader from './form-header';
import Input from './input';
import Alert from 'react-bootstrap/Alert';
import useAlert from '@/hooks/use-alert';
import { objChanged } from '@/functions/object';
import { update } from '@/app/actions/contact';
import { displayMessages } from '@/functions/form';
import { Contact } from '@/types';
import SubmitButton from './buttons/submit';
import BackButton from './buttons/back';
import Form from './form';
import RequiredFieldNotification from './required-field-notification';

export default function FormUpdateContact({ contact }: { contact: Contact }) {
    const { back } = useRouter();

    const { alertType, alertMessage, showAlert, alert } = useAlert();

    const {
        register,
        reset,
        formState: { errors },
        getValues,
        setError,
        clearErrors,
    } = useForm<Contact>();

    useEffect(() => {
        reset(contact);
    }, [contact]);

    const contactChnaged = (newContact: Contact) => {
        return objChanged({
            newObj: newContact,
            originalObj: contact,
        });
    };

    const updateContact = async () => {
        clearErrors();
        const newContact = getValues();
        if (!contactChnaged(newContact)) {
            alert.show('warning', 'O contacto não foi alterado.');
            return;
        }
        const { errors } = await update(newContact, contact._id);
        if (errors) {
            displayMessages(errors, setError);
            return;
        }
        reset();
        back();
        Alerts.success('Contacto actualizado.');
    };

    return (
        <Centralize>
            <Alert variant={alertType} show={showAlert}>
                {alertMessage}
            </Alert>
            <Form action={updateContact}>
                <FormHeader text='Actualizar' />
                <Input
                    label='Nome *'
                    {...register('name')}
                    errMessage={errors.name?.message}
                />
                <Input
                    label='Email'
                    {...register('email')}
                    errMessage={errors.email?.message}
                />
                <Input
                    label='Telefone *'
                    {...register('phoneNumber')}
                    errMessage={errors.phoneNumber?.message}
                    maxLength={9}
                />
                <RequiredFieldNotification />
                <SubmitButton
                    content='Actualizar contacto'
                    spinnerText='Actualizando...'
                />
            </Form>
            <BackButton />
        </Centralize>
    );
}

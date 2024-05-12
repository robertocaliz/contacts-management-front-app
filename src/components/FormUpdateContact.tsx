'use client';

import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Alerts from '@/lib/alerts';
import { useRouter } from 'next/navigation';
import Alert from 'react-bootstrap/Alert';
import { showMessages, objChanged } from '@/functions/forms';
import SubmitButton from './buttons/submit';
import BackButton from './buttons/back';
import Form, { FormHeader, Input } from './form';
import { Centralize, RequiredFieldNotification } from '@/components';
import { useAlert } from '@/hooks';
import { useAction } from 'next-safe-action/hooks';
import { Contact } from '@/types';
import { updateContact } from '../../server/actions/contacts';

type FormUpdateContactProps = {
    data: Contact;
};

export function FormUpdateContact({ data }: FormUpdateContactProps) {
    const router = useRouter();
    const [contact, setContact] = useState<Contact>({} as Contact);
    const { alertType, alertMessage, showAlert, alert } = useAlert();

    useEffect(() => {
        setContact(data);
    }, []);

    useEffect(() => {
        reset(contact);
    }, [contact]);

    const {
        register,
        reset,
        formState: { errors },
        setError,
        clearErrors,
        handleSubmit,
    } = useForm<Contact>();

    const { execute } = useAction(updateContact, {
        onSuccess({ errors, success }) {
            if (success) {
                reset();
                router.back();
                Alerts.success(success.message);
                return;
            }
            showMessages(errors, setError);
        },
        onError({ validationErrors, serverError }) {
            if (validationErrors) {
                console.log(validationErrors);
                return;
            }
            Alerts.error(String(serverError));
        },
    });

    const onSubmit: SubmitHandler<Contact> = (newContact) => {
        clearErrors();
        if (
            !objChanged({
                newObj: newContact,
                originalObj: contact,
            })
        ) {
            alert.show('warning', 'O contacto não foi alterado.');
            return;
        }
        execute({ ...newContact, id: String(contact._id) });
    };

    return (
        <Centralize>
            <Alert variant={alertType} show={showAlert}>
                {alertMessage}
            </Alert>
            <Form onSubmit={handleSubmit(onSubmit)}>
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

'use client';

import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Alerts from '@/lib/alerts';
import { useRouter } from 'next/navigation';
import Alert from 'react-bootstrap/Alert';
import {
    showErrors,
    objChanged,
    showValidationErrors,
} from '@/functions/forms';
import SubmitButton from './buttons/submit';
import BackButton from './buttons/back';
import Form, { FormHeader, Input } from './form';
import { Centralize, RequiredFieldNotification } from '@/components';
import { useAlert } from '@/hooks';
import { useAction } from 'next-safe-action/hooks';
import { Contact } from '@/types';
import { updateContact } from '../../server/actions/contacts';
import { z } from 'zod';
import { updateContactSchema } from '@/lib/schemas';

type UpdateContactFormProps = {
    data: Contact;
};

export const UpdateContactForm: React.FC<UpdateContactFormProps> = ({
    data,
}) => {
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
        clearErrors,
        formState: { errors },
        handleSubmit,
        register,
        reset,
        setError,
    } = useForm<z.infer<typeof updateContactSchema>>();

    const { execute, status: formStatus } = useAction(updateContact, {
        onSuccess({ dataAlreadyExistsErrors, success }) {
            if (dataAlreadyExistsErrors) {
                return showErrors(dataAlreadyExistsErrors, setError);
            }

            reset();
            router.back();
            Alerts.success(success.message);

            return;
        },
        onError({ validationErrors, serverError }) {
            if (validationErrors) {
                return showValidationErrors(validationErrors, setError);
            }

            alert.show('danger', String(serverError));
        },
    });

    const onSubmit: SubmitHandler<z.infer<typeof updateContactSchema>> = (
        data,
    ) => {
        clearErrors();

        if (
            !objChanged({
                newObj: data,
                originalObj: contact,
            })
        ) {
            return alert.show('warning', 'O contacto não foi alterado.');
        }

        execute({ ...data, _id: String(contact._id) });
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
                    submittingForm={formStatus === 'executing'}
                />
            </Form>
            <BackButton />
        </Centralize>
    );
};

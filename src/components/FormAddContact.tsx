'use client';

import Alerts from '@/lib/alerts';
import { useForm } from 'react-hook-form';
import { Contact } from '@/types';
import SubmitButton from './buttons/submit';
import BackButton from './buttons/back';
import Form, { FormHeader, Input } from './form';
import { Centralize, RequiredFieldNotification } from '@/components';
import { createContact } from '../../server/actions/contacts';
import { displayMessages } from '@/functions/form';
import { useAction } from 'next-safe-action/hooks';

export function FormAddContact() {
    const {
        clearErrors,
        formState: { errors },
        getValues,
        reset,
        register,
        setError,
    } = useForm<Contact>();

    const { execute } = useAction(createContact, {
        onSuccess({ success, errors }) {
            if (success) {
                reset();
                Alerts.success(success.message);
                return;
            }
            displayMessages(errors, setError);
        },
        onError({ validationErrors, serverError }) {
            if (validationErrors) {
                return;
            }
            Alerts.error(String(serverError));
        },
    });

    const onSubmit = () => {
        clearErrors();
        const contact = getValues();
        execute(contact);
    };

    return (
        <Centralize>
            <Form action={onSubmit}>
                <FormHeader text='Adicionar' />
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
                    maxLength={9}
                    placeholder='+258'
                    errMessage={errors.phoneNumber?.message}
                />
                <RequiredFieldNotification />
                <SubmitButton
                    content='Criar contacto'
                    spinnerText='Criando...'
                />
            </Form>
            <BackButton />
        </Centralize>
    );
}

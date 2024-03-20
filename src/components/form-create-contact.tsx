'use client';

import Centralize from './centralize';
import FormHeader from './form-header';
import Input from './input';
import { useForm } from 'react-hook-form';
import { Contact } from '@/types';
import Alerts from '@/lib/alerts';
import { create } from '@/app/actions/contact';
import { displayMessages } from '@/functions/form';
import SubmitButton from './buttons/submit';
import BackButton from './buttons/back';
import Form from './form';
import RequiredFieldNotification from './required-field-notification';

export default function FormAddContact() {
    const {
        register,
        getValues,
        setError,
        reset,
        clearErrors,
        formState: { errors },
    } = useForm<Contact>();

    const createContact = async () => {
        clearErrors();
        const contact = getValues();
        const { errors } = await create(contact);
        if (errors) {
            displayMessages(errors, setError);
            return;
        }
        reset();
        Alerts.success('Contacto criado.');
    };

    return (
        <Centralize>
            <Form action={createContact}>
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

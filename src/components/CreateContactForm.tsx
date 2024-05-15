'use client';

import Alerts from '@/lib/alerts';
import { useForm } from 'react-hook-form';
import { Contact } from '@/types';
import SubmitButton from './buttons/submit';
import BackButton from './buttons/back';
import Form, { FormHeader, Input } from './form';
import { Centralize, RequiredFieldNotification } from '@/components';
import { createContact } from '../../server/actions/contacts';
import { showErrors, showValidationErrors } from '@/functions/forms';
import { useAction } from 'next-safe-action/hooks';

export function CreateContactForm() {
    const {
        clearErrors,
        formState: { errors },
        getValues,
        reset,
        register,
        setError,
    } = useForm<Contact>();

    const { execute } = useAction(createContact, {
        onSuccess({ dataAlreadyExistsErrors, success }) {
            if (dataAlreadyExistsErrors) {
                return showErrors(dataAlreadyExistsErrors, setError);
            }
            reset();
            Alerts.success(success.message);
            return;
        },
        onError({ validationErrors, serverError }) {
            if (validationErrors) {
                return showValidationErrors(validationErrors, setError);
            }
            Alerts.error(String(serverError));
        },
    });

    const handleCreateContact = () => {
        clearErrors();
        execute(getValues());
    };

    return (
        <Centralize>
            <Form action={handleCreateContact}>
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

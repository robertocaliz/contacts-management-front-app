import { FormHTMLAttributes } from 'react';

type FormProps = FormHTMLAttributes<HTMLFormElement>;

export default function Form({ ...props }: FormProps) {
    return <form {...props} />;
}

export * from './FormHeader';
export * from './Input';
export * from './PasswordInput';
export * from './Select';
export * from './CheckBox';

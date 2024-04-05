import { FormHTMLAttributes } from 'react';

type FormProps = FormHTMLAttributes<HTMLFormElement>;

function Form({ ...rest }: FormProps) {
    return <form {...rest} />;
}

export default Form;

export * from './FormHeader';
export * from './Input';
export * from './PasswordInput';
export * from './Select';
export * from './CheckBox';

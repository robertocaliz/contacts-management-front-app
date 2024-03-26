import { FormHTMLAttributes } from 'react';

type FormProps = FormHTMLAttributes<HTMLFormElement>;

function Form({ ...rest }: FormProps) {
    return <form {...rest} />;
}

export default Form;

import { FormHTMLAttributes } from 'react';


interface FormProps extends FormHTMLAttributes<HTMLFormElement> { }


function Form({ ...rest }: FormProps) {
	return <form {...rest}></form>;
}

export default Form;
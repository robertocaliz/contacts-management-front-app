import { AnchorHTMLAttributes } from 'react';


interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> { }


export function Link({ href = '', ...rest }: LinkProps) {
	return <a href={href || ''} {...rest}></a>;
}
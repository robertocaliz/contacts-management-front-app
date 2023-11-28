import { HtmlHTMLAttributes } from 'react';


interface ContainerProps extends HtmlHTMLAttributes<HTMLDivElement> { }


function Container({ ...rest }: ContainerProps) {
	return <div {...rest}></div>;
}


export default Container;
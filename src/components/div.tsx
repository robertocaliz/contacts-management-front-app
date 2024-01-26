import { HtmlHTMLAttributes } from 'react';

type DivProps = HtmlHTMLAttributes<HTMLDivElement>;

function Div({ ...rest }: DivProps) {
	return <div {...rest} />;
}

export default Div;

import { HeaderProps } from '.';



function HeaderH2({ text, ...rest }: HeaderProps) {
	return (
		<h2 {...rest}>{text}</h2>
	);
}

export default HeaderH2;
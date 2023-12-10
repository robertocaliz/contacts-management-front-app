import { HtmlHTMLAttributes } from 'react';


interface NavBarProps extends HtmlHTMLAttributes<HTMLHtmlElement> { }


function NavBar({ ...rest }: NavBarProps) {
	return <nav {...rest}></nav>;
}


export default NavBar;
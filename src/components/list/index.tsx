import { HtmlHTMLAttributes } from 'react';


interface ListProps extends HtmlHTMLAttributes<HTMLUListElement> { }


function List({ ...rest }: ListProps) {
	return <ul {...rest}></ul>;
}


export default List;
import { HTMLAttributes } from 'react';

interface FooterProps extends HTMLAttributes<HTMLElement> {}

export const Footer = ({ ...rest }: FooterProps) => {
    return <footer {...rest} />;
};

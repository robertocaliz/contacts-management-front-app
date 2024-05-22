import { HTMLAttributes } from 'react';

interface FooterProps extends HTMLAttributes<HTMLElement> {}

export const Footer = ({ ...props }: FooterProps) => {
    return <footer {...props} />;
};

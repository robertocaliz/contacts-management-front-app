import { ReactNode, InputHTMLAttributes } from 'react';

export type InputProps = {
    label?: string;
    startAdornment?: ReactNode | string;
    endAdornment?: ReactNode | string;
    errMessage?: string;
} & InputHTMLAttributes<HTMLInputElement>;

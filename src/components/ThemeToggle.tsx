'use client';

import { FaMoon } from 'react-icons/fa';
import { BsSunFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useTheme } from 'next-themes';

export const ToggleTheme = () => {
    const [mounted, setMounted] = useState(false);
    const { setTheme, resolvedTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    return (
        <div
            className={clsx(
                'relative flex h-8 w-16 cursor-pointer items-center rounded-full bg-teal-500 p-1 dark:bg-gray-900',
                {
                    'pointer-events-none': mounted === false,
                },
            )}
            onClick={() => {
                setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
            }}
        >
            <FaMoon className='text-white' size={18} />
            <div
                className={clsx(
                    'absolute h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-300 dark:bg-medium',
                    {
                        'left-[2px]': resolvedTheme === 'dark',
                        'right-[2px]': resolvedTheme === 'light',
                    },
                )}
            ></div>
            <BsSunFill className='ml-auto text-yellow-400' size={18} />
        </div>
    );
};

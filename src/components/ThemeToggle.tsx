'use client';

import { FaMoon } from 'react-icons/fa';
import { BsSunFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

export const ToggleTheme = () => {
    const [darkMOde, setDarkMode] = useState(true);

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (!(theme === 'dark')) setDarkMode(false);
    }, []);

    useEffect(() => {
        if (darkMOde) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            return;
        }
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }, [darkMOde]);

    return (
        <div
            className='relative flex h-8 w-16 cursor-pointer items-center rounded-full bg-teal-500 p-1 dark:bg-gray-900'
            onClick={() => setDarkMode(!darkMOde)}
        >
            <FaMoon className='text-white' size={18} />
            <div
                className={clsx(
                    'absolute h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-300 dark:bg-medium',
                    {
                        'left-[2px]': darkMOde === true,
                        'right-[2px]': darkMOde === false,
                    },
                )}
            ></div>
            <BsSunFill className='ml-auto text-yellow-400' size={18} />
        </div>
    );
};

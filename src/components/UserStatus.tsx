'use client';

import { useEffect, useState } from 'react';
import { HiStatusOnline, HiStatusOffline } from 'react-icons/hi';

export function UserStatus() {
    const [onLine, setOnline] = useState(false);

    useEffect(() => {
        const handleOnline = () => {
            setOnline(true);
        };

        const hableOffline = () => {
            setOnline(false);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', hableOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', hableOffline);
        };
    }, []);

    return (
        <div>
            {onLine ? (
                <HiStatusOnline size={21} />
            ) : (
                <HiStatusOffline size={21} />
            )}
        </div>
    );
}

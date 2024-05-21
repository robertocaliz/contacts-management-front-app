'use client';

import Spinner from '@/components/spinner';
import { memo, useTransition } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';

type DeleteButtonProps = {
    handleDelete: (id: string) => void;
    id: string;
};

const DeleteButtonFC = ({ handleDelete, id }: DeleteButtonProps) => {
    const [isPending, startTransition] = useTransition();
    return (
        <button
            className='flex rounded-full p-3 text-[1.3rem] font-bold text-red-600 hover:bg-red-500 hover:text-white hover:duration-700 focus:bg-white focus:text-red-600'
            onClick={() => startTransition(() => handleDelete(id))}
        >
            {isPending ? <Spinner loading={isPending} /> : <RiDeleteBinLine />}
        </button>
    );
};

export const DeleteButton = memo(DeleteButtonFC);

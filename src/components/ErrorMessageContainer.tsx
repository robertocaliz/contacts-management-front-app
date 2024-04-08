import { TiInfo } from 'react-icons/ti';

export const ErrorMessageContainer = ({
    errMessage,
}: {
    errMessage?: string;
}) => {
    return (
        <>
            <div className='mt-1 flex items-center gap-2 text-red-600'>
                {errMessage && (
                    <>
                        <TiInfo className='size-4' />
                        <span className='pt-[1px] text-[0.8rem]'>
                            {errMessage}
                        </span>
                    </>
                )}
            </div>
        </>
    );
};
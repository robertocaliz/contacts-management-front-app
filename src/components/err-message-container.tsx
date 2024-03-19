import { TiInfo } from 'react-icons/ti';

function ErrMessageContainer({ errMessage }: { errMessage?: string }) {
    return (
        <>
            <div className='flex items-center gap-2 text-red-600'>
                {errMessage && (
                    <>
                        <TiInfo className='size-4' />
                        <span className='pt-[1px] text-[0.8rem] font-bold'>
                            {errMessage}
                        </span>
                    </>
                )}
            </div>
        </>
    );
}

export default ErrMessageContainer;

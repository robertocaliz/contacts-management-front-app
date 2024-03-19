import ClipLoader from 'react-spinners/ClipLoader';

type SpinnerProps = {
    loading: boolean;
    text?: string;
};

export default function Spinner({ loading, text }: SpinnerProps) {
    return (
        <div className='flex justify-center gap-2'>
            <ClipLoader color='#0070f3' size={20} loading={loading} />
            {text && <span>{text}</span>}
        </div>
    );
}

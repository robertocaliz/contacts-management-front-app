export const FormHeader = ({ text }: { text: string }) => {
    return (
        <header className='py-2 text-3xl font-bold text-gray-900 dark:text-white'>
            {text}
        </header>
    );
};
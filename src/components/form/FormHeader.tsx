type FormHeaderProps = { text: string };

export const FormHeader = ({ text }: FormHeaderProps) => {
    return (
        <header className='py-2 text-3xl font-bold text-gray-900 dark:text-white'>
            {text}
        </header>
    );
};

type ModalProps = {
    isOpen: boolean;
};

export const Modal = ({ isOpen }: ModalProps) => {
    return (
        <div className='fixed left-0 top-0 z-50  flex h-full w-full items-center justify-center bg-black bg-opacity-50'>
            <div className='rounded-lg bg-white p-8 shadow-lg'>
                <h2 className='mb-4 text-2xl font-bold'>Título do Modal</h2>
                <p>Conteúdo do modal aqui...</p>
                <button className='mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'>
                    Fechar Modal
                </button>
            </div>
        </div>
    );
};

export const getErrorMessage = (message: string, status: number) => {
    return JSON.stringify({ message, status });
};

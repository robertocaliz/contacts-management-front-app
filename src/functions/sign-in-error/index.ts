export const getLoginError = (
    message: string,
    status: number,
    error: Record<string, unknown>,
) => {
    error.message = JSON.stringify({ message, status });
};

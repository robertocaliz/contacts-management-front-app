


export const getSignInError = (message: string, status: number) => {
	return JSON.stringify({ message, status });
};
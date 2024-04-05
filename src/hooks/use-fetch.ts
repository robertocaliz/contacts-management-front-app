import useSWR from 'swr';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Action = (url: string) => Promise<any>;

export const useFetch = <Data = unknown>(url: string, action: Action) => {
    return useSWR<Data>(url, async (url: string) => {
        return await action(url);
    });
};

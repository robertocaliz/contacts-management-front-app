import useSWR from 'swr';

type ActionParams = { path: string };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Action = ({ path }: ActionParams) => Promise<any>;

export const useFetch = <Data = unknown>(path: string, action: Action) => {
    return useSWR<Data>(path, async (path: string) => {
        return await action({ path });
    });
};

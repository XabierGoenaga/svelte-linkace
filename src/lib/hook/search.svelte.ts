/* eslint-disable @typescript-eslint/no-explicit-any */
interface UseSearchProps {
	remote: any;
}

export const useSearch = ({ remote }: UseSearchProps) => {
	const query = $state<{ value: string }>({ value: '' });
	const data = $derived(remote(query.value));

	return { query, data };
};

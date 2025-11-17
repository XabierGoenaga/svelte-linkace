export const onChangeNumber = (e: Event): number => {
	if (e.target) return parseInt((e.target as HTMLSelectElement).value);
	return 0;
};

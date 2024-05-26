export const validate = (value: string | undefined) => {
	value = value?.trim();

	if (value === " " || !value) {
		return false;
	}

	return true;
};

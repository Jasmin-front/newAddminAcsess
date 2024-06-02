export const formatDateInput = input => {
	input = input.replace(/\D/g, '');
	if (input.length > 8) {
		input = input.slice(0, 8);
	}

	const day = input.slice(0, 2);
	const month = input.slice(2, 4);
	const year = input.slice(4, 8);

	let formattedValue = '';
	if (day) formattedValue = day;
	if (month) formattedValue += '.' + month;
	if (year) formattedValue += '.' + year;

	return formattedValue;
};

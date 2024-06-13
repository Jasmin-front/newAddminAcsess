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

function setCookie(name, value, options = {}) {
	options = {
		path: '/',
		// при необходимости добавьте другие значения по умолчанию
		expires: new Date(Date.now() + 86400000),
		...options,
	};

	if (options.expires instanceof Date) {
		options.expires = options.expires.toUTCString();
	}
	let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

	for (let optionKey in options) {
		updatedCookie += '; ' + optionKey;
		let optionValue = options[optionKey];
		if (optionValue !== true) {
			updatedCookie += '=' + optionValue;
		}
	}

	document.cookie = updatedCookie;
}
function deleteCookie(name) {
	setCookie(name, '', {
		'max-age': -1,
	});
}

// возвращает куки с указанным name,
// или undefined, если ничего не найдено
function getCookie(name) {
	let matches = document.cookie.match(
		new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
	);
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const cookieStorage = {
	setCookie,
	deleteCookie,
	getCookie,
};

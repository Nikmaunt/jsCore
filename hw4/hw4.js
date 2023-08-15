function concatStrings(initialString, separator) {
	if (typeof initialString !== 'string' || initialString === '') {
		return '';
	}

	if (typeof separator !== 'string') {
		separator = '';
	}

	return function (nextString) {
		if (typeof nextString !== 'string') {
			return initialString;
		}

		return concatStrings(initialString + separator + nextString, separator);
	};
}



Array.prototype.myFilter = function (callback, thisArg) {
	if (typeof callback !== 'function') {
		throw new TypeError('Callback must be a function');
	}

	const newArray = [];
	const array = this;

	for (let i = 0; i < array.length; i++) {
		if (i in array) {
			const currentItem = array[i];
			if (callback.call(thisArg, currentItem, i, array)) {
				newArray.push(currentItem);
			}
		}
	}

	return newArray;
};

function createDebounceFunction(callback, delay) {
	let timerId;

	return function () {
		clearTimeout(timerId);

		timerId = setTimeout(() => {
			callback.apply(this, arguments);
		}, delay);
	};
}


const makeObjectDeepCopy = (obj) => {
	if (obj === null) {
		return null;
	}

	let clone = Object.assign({}, obj);

	Object.keys(clone).forEach(
		(key) => (clone[key] = typeof obj[key] === 'object' ? makeObjectDeepCopy(obj[key]) : obj[key])
	);

	return Array.isArray(obj) && obj.length
		? (clone.length = obj.length) && Array.from(clone)
		: Array.isArray(obj)
		? Array.from(obj)
		: clone;
};

function selectFromInterval(arr, intervalStart, intervalEnd) {
	if (!Array.isArray(arr) || !arr.every((num) => typeof num === 'number')) {
		throw new Error('Ошибка!');
	}

	if (typeof intervalStart !== 'number' || typeof intervalEnd !== 'number') {
		throw new Error('Ошибка!');
	}

	if (intervalStart < intervalEnd) {
		return arr.filter((num) => num >= intervalStart && num <= intervalEnd);
	} else {
		return arr.filter((num) => num >= intervalEnd && num <= intervalStart);
	}
}


const myIterable = {
	from: 1,
	to: 4,
	[Symbol.iterator]() {
		const from = this.from;
		const to = this.to;

		if (typeof from !== 'number' || typeof to !== 'number') {
			throw new Error('Ошибка!');
		}

		if (to < from) {
			throw new Error('Ошибка!');
		}

		let current = from;

		return {
			next() {
				if (current <= to) {
					return { value: current++, done: false };
				} else {
					return { done: true };
				}
			},
		};
	},
};

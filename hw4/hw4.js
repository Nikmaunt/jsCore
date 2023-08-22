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

class Calculator {
	constructor(x, y) {
		if (!this.isValidNumber(x) || !this.isValidNumber(y)) {
			throw new Error('Invalid number');
		}
		this.x = x;
		this.y = y;

		this.logSum = () => {
			console.log(this.x + this.y);
		};

		this.logMul = () => {
			console.log(this.x * this.y);
		};

		this.logSub = () => {
			console.log(this.x - this.y);
		};

		this.logDiv = () => {
			if (this.y === 0) {
				throw new Error('Division by zero');
			}
			console.log(this.x / this.y);
		};
	}

	isValidNumber(num) {
		return typeof num === 'number' && isFinite(num) && !isNaN(num);
	}

	setX(num) {
		if (!this.isValidNumber(num)) {
			throw new Error('Invalid number');
		}
		this.x = num;
	}

	setY(num) {
		if (!this.isValidNumber(num)) {
			throw new Error('Invalid number');
		}
		this.y = num;
	}
}

function isValidNumber(value) {
	return !isNaN(value) && !Number.isFinite(value);
}

function convertToBase(num, base) {
	return num.toString(base);
}

function main() {
	const firstValue = prompt('Введите первое значение:');
	const secondValue = prompt('Введите второе значение:');

	if (!isValidNumber(firstValue) || !isValidNumber(secondValue)) {
		console.log('Некорректный ввод!');
		return;
	}

	const firstNumber = Number(firstValue);
	const secondNumber = Number(secondValue);

	console.log(convertToBase(firstNumber, secondNumber));
}

main();

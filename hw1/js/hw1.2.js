function isValidNumber(value) {
	return !isNaN(value) && !Number.isFinite(value);
}

function calculateSumAndDivision(a, b) {
	const sum = a + b;
	const division = a / b;
	return `Ответ: ${sum}, ${division}.`;
}

function main() {
	const firstValue = prompt('Введите первое значение:');

	if (!isValidNumber(firstValue)) {
		console.log('Некорректный ввод!');
		return;
	}

	const secondValue = prompt('Введите второе значение:');

	if (!isValidNumber(secondValue)) {
		console.log('Некорректный ввод!');
		return;
	}

	const firstNumber = Number(firstValue);
	const secondNumber = Number(secondValue);

	console.log(calculateSumAndDivision(firstNumber, secondNumber));
}

main();

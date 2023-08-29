document.addEventListener('DOMContentLoaded', function () {
	let memoryValue = 0;
	let currentInput = '0';
	let currentOperation = '';
	let hasDecimal = false;

	document.addEventListener('keydown', function (event) {
		event.preventDefault();
		const key = event.key;

		switch (key) {
			case '+':
			case '-':
			case '*':
			case '/':
				handleOperatorInput(key);
				break;
			case '%':
				handlePercentage();
				break;
			case 'Enter':
				evaluate();
				currentOperation = '';
				break;
			case 'Backspace':
				handleBackspace();
				break;
			case 'Escape':
				handleAllClear();
				break;
			case '.':
				handleDecimalInput();
				break;
			default:
				if (/^\d$/.test(key)) {
					handleNumberInput(key);
				}
				break;
		}
	});

	function updateDisplay() {
		const currentInputDisplay = document.querySelector('.current-input');
		const previousOperationsDisplay = document.querySelector('.previous-operations');

		currentInputDisplay.textContent = currentInput;
		previousOperationsDisplay.textContent = currentOperation;
	}

	function handleNumberInput(number) {
		if (currentInput === '0') {
			currentInput = number;
		} else {
			currentInput += number;
		}

		updateDisplay();
	}

	function handleOperatorInput(operator) {
		if (currentOperation) {
			evaluate();
			currentOperation = `${currentInput} ${operator}`;
		} else {
			currentOperation = `${currentInput} ${operator}`;
		}

		currentInput = '0';
		hasDecimal = false;
		updateDisplay();
	}

	function evaluate() {
		if (currentOperation) {
			const operationParts = currentOperation.split(' ');
			const operand1 = parseFloat(operationParts[0]);
			const operator = operationParts[1];
			const operand2 = parseFloat(currentInput);
			let result = 0;

			switch (operator) {
				case '+':
					result = operand1 + operand2;
					break;
				case '-':
					result = operand1 - operand2;
					break;
				case '*':
					result = operand1 * operand2;
					break;
				case '/':
					result = operand1 / operand2;
					break;
				case '%':
					result = (operand1 * operand2) / 100;
					break;
			}

			currentInput = result.toFixed(8).toString();
			currentOperation = '';
			updateDisplay();
		}
	}

	function handleDecimalInput() {
		if (!hasDecimal) {
			currentInput += '.';
			hasDecimal = true;
			updateDisplay();
		}
	}

	function handlePercentage() {
		if (currentOperation) {
			evaluate();
		}
		currentInput = (parseFloat(currentInput) / 100).toString();
		updateDisplay();
	}

	function handleSquareRoot() {
		currentInput = Math.sqrt(parseFloat(currentInput)).toString();
		updateDisplay();
	}

	function changeSign() {
		currentInput = (-parseFloat(currentInput)).toString();
		updateDisplay();
	}

	function handleMemoryAdd() {
		memoryValue += parseFloat(currentInput);
	}

	function handleMemorySubtract() {
		memoryValue -= parseFloat(currentInput);
	}

	function handleMemoryRecall() {
		currentInput = memoryValue.toString();
		updateDisplay();
	}

	function handleMemoryClear() {
		memoryValue = 0;
	}

	function handleClear() {
		currentInput = '0';
		currentOperation = '';
		hasDecimal = false;
		updateDisplay();
	}

	function handleAllClear() {
		handleClear();
		handleMemoryClear();
	}

	function handleBackspace() {
		if (currentInput.length > 1) {
			currentInput = currentInput.slice(0, -1);
		} else {
			currentInput = '0';
		}

		updateDisplay();
	}

	function handleZeroZero() {
		currentInput += '00';
		updateDisplay();
	}

	function handleButtonClick(event) {
		const buttonValue = event.target.textContent;

		switch (buttonValue) {
			case '+':
			case '-':
			case '×':
			case '÷':
				handleOperatorInput(buttonValue);
				break;
			case '%':
				handlePercentage();
				break;
			case '√':
				handleSquareRoot();
				break;
			case '+/-':
				changeSign();
				break;
			case 'M+':
				handleMemoryAdd();
				break;
			case 'M-':
				handleMemorySubtract();
				break;
			case 'MR':
				handleMemoryRecall();
				break;
			case 'MC':
				handleMemoryClear();
				break;
			case 'C':
				handleClear();
				break;
			case 'AC':
				handleAllClear();
				break;
			case '←':
				handleBackspace();
				break;
			case '00':
				handleZeroZero();
				break;
			case '.':
				handleDecimalInput();
				break;
			case '=':
				evaluate();
				break;
			default:
				if (buttonValue >= '0' && buttonValue <= '9') {
					handleNumberInput(buttonValue);
				}
				break;
		}
	}

	const buttons = document.querySelectorAll('.buttons button');
	buttons.forEach((button) => {
		button.addEventListener('click', handleButtonClick);
	});
});

class Node {
	constructor(value, next = null) {
		this.value = value;
		this.next = next;
	}
}

class Stack {
	constructor(maxSize = 10) {
		if (typeof maxSize !== 'number' || isNaN(maxSize)) {
			throw new Error('Invalid maxSize parameter');
		}

		this.maxSize = maxSize;
		this.top = null;
		this.size = 0;
	}

	push(elem) {
		if (this.size >= this.maxSize) {
			throw new Error('Stack is full');
		}

		const newNode = new Node(elem, this.top);
		this.top = newNode;
		this.size++;
	}

	pop() {
		if (this.isEmpty()) {
			throw new Error('Stack is empty');
		}

		const poppedValue = this.top.value;
		this.top = this.top.next;
		this.size--;
		return poppedValue;
	}

	peek() {
		if (this.isEmpty()) {
			return null;
		}

		return this.top.value;
	}

	isEmpty() {
		return this.size === 0;
	}

	toArray() {
		const result = [];
		let current = this.top;
		while (current) {
			result.push(current.value);
			current = current.next;
		}
		return result.reverse();
	}

	static fromIterable(iterable) {
		if (!Symbol.iterator in Object(iterable)) {
			throw new Error('Iterable is required');
		}

		const stack = new Stack(iterable.length);
		for (const item of iterable) {
			stack.push(item);
		}
		return stack;
	}
}

class LinkedList {
	constructor() {
		this.head = null;
		this.tail = null;
	}

	append(elem) {
		const newNode = { value: elem, next: null };

		if (!this.head) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			this.tail.next = newNode;
			this.tail = newNode;
		}
	}

	prepend(elem) {
		const newNode = { value: elem, next: this.head };

		if (!this.head) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			this.head = newNode;
		}
	}
}

// module.exports = { Stack, LinkedList };


const stack = new Stack(3);

// Проверяем добавление элементов
stack.push(1);
stack.push(2);
stack.push(3);

// Ожидаем ошибку, так как стек переполнен
try {
	stack.push(4);
} catch (error) {
	console.error(error.message); // Output: Stack is full
}

// Проверяем метод pop
console.log(stack.pop()); // Output: 3

// Проверяем метод peek
console.log(stack.peek()); // Output: 2

// Проверяем метод isEmpty
console.log(stack.isEmpty()); // Output: false

// Проверяем метод toArray
console.log(stack.toArray()); // Output: [1, 2]

// Создаем стек из итерируемой сущности
const iterableStack = Stack.fromIterable([5, 6, 7]);
console.log(iterableStack.toArray()); // Output: [5, 6, 7]

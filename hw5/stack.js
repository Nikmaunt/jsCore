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
		const newNode = new Node(elem, this.head);

		if (!this.head) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			this.tail.next = newNode;
			this.tail = newNode;
		}
	}

	prepend(elem) {
		const newNode = new Node(elem, this.head);

		if (!this.head) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			this.head = newNode;
		}
	}

	static fromIterable(iterable) {
		if (!Symbol.iterator in Object(iterable)) {
			throw new Error('Iterable is required');
		}

		const linkedList = new LinkedList();

		for (const item of iterable) {
			linkedList.append(item);
		}

		return linkedList;
	}
}

// module.exports = { Stack, LinkedList };
const linkedList = new LinkedList();

// Тест метода append
linkedList.append(1);
linkedList.append(2);
linkedList.append(3);

console.log(linkedList); // Output: { head: { value: 1, next: { value: 2, next: [Object] } }, tail: { value: 3, next: null } }

// Тест метода prepend
linkedList.prepend(0);

console.log(linkedList); // Output: { head: { value: 0, next: { value: 1, next: [Object] } }, tail: { value: 3, next: null } }

console.log(linkedList); // Output: { head: { value: 0, next: { value: 1, next: [Object] } }, tail: { value: 3, next: null } }

// Тест метода fromIterable
const iterable = [4, 5, 6];
const newList = LinkedList.fromIterable(iterable);

console.log(newList); // Output: { head: { value: 4, next: { value: 5, next: [Object] } }, tail: { value: 6, next: null } }
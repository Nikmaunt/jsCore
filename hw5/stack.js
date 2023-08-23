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

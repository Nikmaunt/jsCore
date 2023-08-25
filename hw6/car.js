export class Car {
	#brand;
	#model;
	#yearOfManufacturing;
	#maxSpeed;
	#maxFuelVolume;
	#fuelConsumption;
	#currentFuelVolume = 0;
	#isStarted = false;
	#mileage = 0;

	constructor({ brand, model, yearOfManufacturing, maxSpeed, maxFuelVolume, fuelConsumption }) {
		this.#setBrand(brand);
		this.#setModel(model);
		this.#setYearOfManufacturing(yearOfManufacturing);
		this.#setMaxSpeed(maxSpeed);
		this.#setMaxFuelVolume(maxFuelVolume);
		this.#setFuelConsumption(fuelConsumption);
	}

	#validateNumber(value, minValue, maxValue) {
		if (typeof value !== 'number' || isNaN(value) || value < minValue || value > maxValue) {
			throw new Error(`Invalid value, should be between ${minValue} and ${maxValue}`);
		}
	}

	#setBrand(brand) {
		if (typeof brand !== 'string' || brand.length < 1 || brand.length > 50) {
			throw new Error('Invalid brand length');
		}
		this.#brand = brand;
	}

	#setModel(model) {
		if (typeof model !== 'string' || model.length < 1 || model.length > 50) {
			throw new Error('Invalid model length');
		}
		this.#model = model;
	}

	#setYearOfManufacturing(year) {
		const currentYear = new Date().getFullYear();
		this.#validateNumber(year, 1900, currentYear);
		this.#yearOfManufacturing = year;
	}

	#setMaxSpeed(speed) {
		this.#validateNumber(speed, 100, 300);
		this.#maxSpeed = speed;
	}

	#setMaxFuelVolume(volume) {
		this.#validateNumber(volume, 5, 20);
		this.#maxFuelVolume = volume;
	}

	#setFuelConsumption(consumption) {
		this.#validateNumber(consumption, 0, 100);
		this.#fuelConsumption = consumption;
	}

	start() {
		if (this.#isStarted) {
			throw new Error('Car is already started');
		}
		this.#isStarted = true;
	}

	shutDownEngine() {
		if (!this.#isStarted) {
			throw new Error('Car is not started');
		}
		this.#isStarted = false;
	}

	fillUpGasTank(fuel) {
		this.#validateNumber(fuel, 0, this.#maxFuelVolume - this.#currentFuelVolume);

		if (this.#currentFuelVolume + fuel > this.#maxFuelVolume) {
			throw new Error('Gas tank overflow');
		}

		this.#currentFuelVolume += fuel;
	}

	drive(speed, hours) {
		this.#validateNumber(speed, 1, this.#maxSpeed);
		this.#validateNumber(hours, 1, Number.MAX_SAFE_INTEGER);

		if (!this.#isStarted) {
			throw new Error('Car should be started to drive');
		}

		const maxDistance = this.#currentFuelVolume / (this.#fuelConsumption / 100);
		const distance = speed * hours;

		if (distance > maxDistance) {
			throw new Error('Not enough fuel for the trip');
		}

		this.#currentFuelVolume -= distance * (this.#fuelConsumption / 100);
		this.#mileage += distance;
	}

	get brand() {
		return this.#brand;
	}

	get model() {
		return this.#model;
	}

	get yearOfManufacturing() {
		return this.#yearOfManufacturing;
	}

	get maxSpeed() {
		return this.#maxSpeed;
	}

	get maxFuelVolume() {
		return this.#maxFuelVolume;
	}

	get fuelConsumption() {
		return this.#fuelConsumption;
	}

	get currentFuelVolume() {
		return this.#currentFuelVolume;
	}

	get isStarted() {
		return this.#isStarted;
	}

	get mileage() {
		return this.#mileage;
	}
}

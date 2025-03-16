export default class Ship {
  #length;
  #hit;
  constructor(length) {
    this.#validateLength(length);
    this.#length = length;
    this.#hit = length;
  }

  get length() {
    return this.#length;
  }

  set length(value) {
    this.#validateLength(value);
    this.#length = value;
  }

  get hit() {
    return this.#hit;
  }

  hit() {
    if (this.#hit > 0) {
      this.#hit--;
    }
  }

  get isSunked() {
    return this.#hit === 0;
  }

  #validateLength(value) {
    if (!Number.isInteger(value)) {
      throw new Error("Length of ship must be an integer");
    }
    if (value > 5 || value < 2) {
      throw new Error("Length of ship must be in range 2-5");
    }
  }
}

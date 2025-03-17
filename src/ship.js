export default class Ship {
  #length;
  #hit;
  #coordinate;

  constructor(length, coordinate) {
    this.#validateLength(length);
    this.#length = length;
    this.#hit = length;

    this.#validateCoordinate(coordinate);
    this.#coordinate = coordinate;
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

  gotHit() {
    if (this.#hit > 0) {
      this.#hit--;
    }
  }

  get isSunked() {
    return this.#hit === 0;
  }

  get coordinate() {
    return this.#coordinate;
  }

  set coordinate([startX, startY, endX, endY]) {
    this.#validateCoordinate([startX, startY, endX, endY]);
    this.#coordinate = [startX, startY, endX, endY];
  }

  #validateCoordinate([startX, startY, endX, endY]) {
    if (startX === endX && endY - this.#length !== startY) {
      throw new Error("Invalid input coordinate");
    }
    if (startY === endY && endX - this.#length !== startX) {
      throw new Error("Invalid input coordinate");
    }
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

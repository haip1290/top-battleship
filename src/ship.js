export default class Ship {
  #length;
  #hit;
  #coordinate;

  constructor(length, coordinate = null) {
    this.#validateLength(length);
    this.#length = length;
    this.#hit = length;
    if (coordinate !== null) {
      this.#validateCoordinate(coordinate);
      this.#coordinate = coordinate;
    }
  }

  get length() {
    return this.#length;
  }

  gotHit() {
    if (this.#hit > 0) {
      this.#hit--;
    }
  }

  get isSunked() {
    return this.#hit === 0;
  }

  set coordinate(coordinate) {
    this.#validateCoordinate(coordinate);
    this.#coordinate = coordinate;
  }

  get coordinate() {
    return this.#coordinate;
  }

  #validateCoordinate(coordinate) {
    let [startX, endX, startY, endY] = coordinate;
    if (endX - startX === 1 && endY - startY !== this.#length) {
      throw new Error(
        `Invalid ship coordinate, length is ${this.#length}, coordinate is ${startX}, ${startY}, ${endX}, ${endY}`,
      );
    }
    if (endY - startY === 1 && endX - startX !== this.#length) {
      throw new Error(
        `Invalid ship coordinate, length is ${this.#length}, coordinate is ${startX}, ${startY}, ${endX}, ${endY}`,
      );
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

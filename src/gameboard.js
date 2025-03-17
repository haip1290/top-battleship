import Ship from "./ship";

export default class Gameboard {
  static size = 10;
  #ships;
  #receivedHits;

  constructor() {
    this.#ships = [];
    this.#receivedHits = [];
  }

  placeShip(length, coordinate) {
    const ship = new Ship(length, coordinate);
    this.#ships.push(ship);
  }

  get receivedHit() {
    return this.#receivedHits;
  }

  set receivedHit(coordinate) {
    this.validateCoordiate(coordinate);
    this.receivedHit;
  }

  validateCoordiate(coordinate) {
    if (coordinate.some((x) => x > 9 || x < 0)) {
      throw new Error("Invalid coordinate, must be in 10x10 board (0-9)");
    }
  }
}

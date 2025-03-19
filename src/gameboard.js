import { tr } from "date-fns/locale";
import Ship from "./ship";

export default class Gameboard {
  static size = 10;
  #ships;
  #missAttacks;
  #hitAttacks;

  constructor() {
    this.#ships = [];
    this.#missAttacks = [];
    this.#hitAttacks = [];
  }

  get ships() {
    return this.#ships;
  }

  initShips() {
    const ships = [
      new Ship(5),
      new Ship(4),
      new Ship(3),
      new Ship(3),
      new Ship(2),
    ];

    this.#ships.push(...ships);

    for (let index = 0; index < this.#ships.length; index++) {
      let ship = this.#ships[index];
      let length = ship.length;
      this.placeShip(ship, [1, 1 + length, index * 2, index * 2]);
    }
  }

  placeShip(ship, coordinate) {
    this.validateCoordiate(coordinate);
    ship.coordinate = coordinate;
  }

  receiveAttack(coordinate) {
    this.validateCoordiate(coordinate);

    let ship = this.findHitShip(coordinate);
    if (ship !== null) {
      this.#hitAttacks.push(coordinate);
      ship.gotHit();

      return ship;
    } else {
      this.#missAttacks.push(coordinate);
      return null;
    }
  }

  get missAttacks() {
    return this.#missAttacks;
  }

  get hitAttacks() {
    return this.#hitAttacks;
  }

  findHitShip(coordinate) {
    let [hitX, hitY] = coordinate;
    return (
      this.#ships.find((ship) => {
        let [startX, endX, startY, endY] = ship.coordinate;
        return (
          (startX === endX &&
            hitX === startX &&
            startY <= hitY &&
            hitY < endY) ||
          (startY === endY && hitY === startY && startX <= hitX && hitX < endX)
        );
      }) || null
    );
  }

  randomAttack() {
    let x, y;
    do {
      x = Math.floor(Math.random() * Gameboard.size);
      y = Math.floor(Math.random() * Gameboard.size);
    } while (
      this.hitAttacks.some(([hitX, hitY]) => hitX === x && hitY === y) ||
      this.missAttacks.some(([hitX, hitY]) => hitX === x && hitY === y)
    );
    return [x, y];
  }

  areAllSunked() {
    return this.#ships.every((ship) => {
      ship.isSunked === true;
    });
  }

  validateCoordiate(coordinate) {
    if (coordinate.some((x) => x > 9 || x < 0)) {
      throw new Error("Invalid coordinate, must be in 10x10 board (0-9)");
    }
  }
}

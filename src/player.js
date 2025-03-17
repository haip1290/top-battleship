import Gameboard from "./gameboard";

export default class Player {
  #type;
  #gameboard;
  static allowedTypes = ["human", "computer"];

  constructor(type) {
    this.#validateType(type);
    this.#type = type;
    this.#gameboard = new Gameboard();
  }

  get type() {
    return this.#type;
  }

  set type(type) {
    this.#validateType(type);
    this.#type = type;
  }

  get gameboard() {
    return this.#gameboard;
  }

  static #formatAllowTypes() {
    const types = Player.allowedTypes;
    return types.length > 1
      ? types.splice(0, -1).join(",") + types[types.length - 1]
      : types[0];
  }

  #validateType(type) {
    if (!Player.allowedTypes.includes(type)) {
      throw new Error(
        `Invalid type ${type}, must be ${Player.#formatAllowTypes()} `,
      );
    }
  }
}

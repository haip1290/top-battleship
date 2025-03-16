import Ship from "../ship";

describe("Ship test", () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(3);
  });

  test("Test initialzing a ship", () => {
    expect(ship.length).toBe(3);
    expect(ship.hit).toBe(3);
    expect(ship.isSunked).toBe(false);
  });

  test("Test hit decrease when gotHit", () => {
    ship.gotHit();
    expect(ship.hit).toBe(2);
    expect(ship.isSunked).toBe(false);
  });

  test("Test isSunked when gotHit enough times", () => {
    ship.gotHit();
    ship.gotHit();
    ship.gotHit();
    expect(ship.hit).toBe(0);
    expect(ship.isSunked).toBe(true);
  });

  test("Test isSunked when gotHit to negative hit point", () => {
    ship.gotHit();
    ship.gotHit();
    ship.gotHit();
    ship.gotHit();
    expect(ship.hit).toBe(0);
    expect(ship.isSunked).toBe(true);
  });

  test("should allow setting a valid length", () => {
    ship.length = 4;
    expect(ship.length).toBe(4);
  });

  test("should throw an error if setting an invalid length", () => {
    expect(() => (ship.length = 6)).toThrow(
      "Length of ship must be in range 2-5",
    );
    expect(() => (ship.length = "four")).toThrow(
      "Length of ship must be an integer",
    );
  });

  test("should throw an error if an invalid length is provided at initialization", () => {
    expect(() => new Ship(6)).toThrow("Length of ship must be in range 2-5");
    expect(() => new Ship(1)).toThrow("Length of ship must be in range 2-5");
    expect(() => new Ship("three")).toThrow(
      "Length of ship must be an integer",
    );
  });
});

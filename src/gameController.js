import Gameboard from "./gameboard";
import Player from "./player";

const player = new Player("human");
player.gameboard.initShips();
const computer = new Player("computer");
computer.gameboard.initShips();

let currentPlayer = player;

function switchPlayer() {
  currentPlayer = currentPlayer.type === "human" ? computer : player;
}

export { player, computer, currentPlayer, switchPlayer };

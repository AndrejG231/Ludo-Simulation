import Board from "./Board";
import Player from "./Player";
import { rollDice } from "./utility";

const main = (n: number) => {
  const board = new Board(n);
  const [p1, p2] = [new Player(board, 0), new Player(board, 2)];
  const [onTurn, waiting] = [p1, p2];

  while (true) {
    //If players has figures on board:
    if (onTurn.hasFigures()) {
      const rolledNumber = rollDice(onTurn.displayName); //returns rolled number and prints dice roll message
      let playerDidMove = false; //Used for checking if player already made a move in specific round

      //Checking possible moves for each players figure, moving if possible
      for (const figure of onTurn.figures) {
        if (figure.canMoveInHouse(rolledNumber)) {
          figure.move(rolledNumber);
          playerDidMove = true;
          break;
        }
      }
    }
  }
};

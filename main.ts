import Board from "./Board";
import Player from "./Player";
import { rollDice } from "./utility";

const main = (n: number) => {
  const board = new Board(n);
  const [p1, p2] = [new Player(board, 0), new Player(board, 2)];

  board.addPlayers(p1);
  board.addPlayers(p2);

  let [onTurn, waiting] = [p1, p2];

  while (true) {
    //If players has figures on board:
    if (onTurn.hasFigures()) {
      const rolledNumber = rollDice(onTurn.displayName); //returns rolled number and prints dice roll message
      let playerDidMove = false; //Used for checking if player already made a move in specific round

      //Checking possible moves for each players figure, moving if possible
      for (const figure of onTurn.figures) {
        /*
        First checking if it is possible to get into house or move inside
        house to further position
        */
        if (figure.canMove(rolledNumber)) {
          figure.move(rolledNumber);
          playerDidMove = true;
          break;
        }
      }
      if (
        !playerDidMove &&
        rolledNumber === 6 &&
        !onTurn.reachedFigureLimit()
      ) {
        //If no figures could be moved and we threw 6 we want to add another figure.
        onTurn.addFigure();
        playerDidMove = true;
      }

      if (playerDidMove) {
        board.update();
        //Update board if player made a move.
      }

      board.print();

      if (onTurn.hasWon()) {
        console.log(`${onTurn.displayName} has won.`);
        break;
        //End game if player won
      }

      if (rolledNumber !== 6) {
        //If player rolled 6 he continues another round
        [onTurn, waiting] = [waiting, onTurn];
      }
    } else {
      //Player has no figures. Gets three tries:
      for (let i = 0; i < 3; i++) {
        const rolledNumber = rollDice(onTurn.displayName);
        if (rolledNumber === 6) {
          //If player hits 6, add figure
          onTurn.addFigure();
          board.update();
          board.print();
          break;
        }
      }

      if (!onTurn.hasFigures()) {
        //If figure was added, player rolled 6 and gets another round
        [onTurn, waiting] = [waiting, onTurn];
      }
    }
  }
};

//Launch
main(9);

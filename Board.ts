import Figure from "./Figure";
import Player from "./Player";
import { getColumnSpacer } from "./utility";

class Board {
  /* 
  Board - 2 dimensional array containing board outline of size (n * 4) - 4,
  and 4x houses of size ((n - 3) / 2)
   */

  size: number;
  board: string[][];
  players: Player[];

  constructor(n: number) {
    if (n % 2 === 0) {
      throw "Rozmer sachovnice musi byt neparne cislo.";
    }
    if (n < 5) {
      throw "Rozmer sachovnice priliz nizky.";
    }

    this.size = n;
    this.board = [
      new Array(n * 4 - 4).fill("*"),
      ...new Array(4).fill(new Array((n - 3) / 2).fill("D")),
    ];
  }

  toString() {
    let printString = "";
    const printBoard = this.board.map((part) => [...part]);
    //immutable copy of the board;

    for (let i = 0; i < this.size; i++) {
      //First row:
      if (i === 0) {
        const { start, end } = getColumnSpacer(i, this.size);

        printString +=
          start +
          printBoard[0].pop() +
          printBoard[0].shift() +
          printBoard[0].shift() +
          end;

        continue;
      }

      //All rows from start to  first middle row:
      if (i < (this.size - 3) / 2) {
        const { start, end } = getColumnSpacer(i, this.size);

        printString +=
          start +
          printBoard[0].pop() +
          printBoard[1].shift() +
          printBoard[0].shift() +
          end;

        continue;
      }

      //First of 3 middle rows:
      if (i < (this.size - 3) / 2 + 1) {
        printString += `${i}`;

        for (let j = (this.size - 1) / 2; j > 0; j--) {
          printString += printBoard[0].splice(-1 * j, 1);
        }

        printString += printBoard[1].shift();

        for (let j = 0; j < (this.size - 1) / 2; j++) {
          printString += printBoard[0].shift();
        }

        printString += "\n";

        continue;
      }

      //Second middle row:
      if (i < (this.size - 3) / 2 + 2) {
        printString += `${i}` + printBoard[0].pop();

        for (let j = 0; j < (this.size - 3) / 2; j++) {
          printString += printBoard[4].shift();
        }

        printString += "X";

        for (let j = 0; j < (this.size - 3) / 2; j++) {
          printString += printBoard[2].pop();
        }

        printString += printBoard[0].shift() + "\n";
        continue;
      }

      //Third middle row:
      if (i < (this.size - 3) / 2 + 3) {
        printString += `${i}`;

        for (let j = 0; j < (this.size - 1) / 2; j++) {
          printString += printBoard[0].pop();
        }

        printString += printBoard[3].pop();

        for (let j = (this.size - 1) / 2 - 1; j >= 0; j--) {
          printString += printBoard[0].splice(j, 1);
        }

        printString += "\n";

        continue;
      }

      //All rows from last middle row to end row:
      if (i < this.size - 1) {
        const { start, end } = getColumnSpacer(i, this.size);

        printString +=
          start +
          printBoard[0].pop() +
          printBoard[3].pop() +
          printBoard[0].shift() +
          end;

        continue;
      }
      //Last row:
      else {
        const { start, end } = getColumnSpacer(i, this.size);

        printString +=
          start +
          printBoard[0].pop() +
          printBoard[0].pop() +
          printBoard[0].pop() +
          end.slice(0, -1);

        continue;
      }
    }

    return printString;
  }

  print() {
    console.log(" " + this.toString().split("").join(" "));
  }

  handleMove(movingFigure: Figure, diceRoll: number) {
    for (const player of this.players) {
      if (player === movingFigure.player) {
        continue;
      }
      for (const figure of player.figures) {
        if (
          !figure.isInHome() &&
          figure.position + player.offset ===
            movingFigure.position + diceRoll + movingFigure.player.offset
        ) {
          console.log(
            `${movingFigure.player.displayName} kicked ${player.displayName}'s figure!`
          );
          player.removeFigure(figure);
        }
        /*
        Figures are on same position on board if sum of their position and
        player offset are the same

        
        ** Players 1 figure on position 30 is opposite side to Players 3 figure.
        */
      }
    }
  }
  update() {
    for (const player of this.players) {
      for (const figure of player.figures) {
        figure.loadIntoBoard();
      }
    }
  }
}

export default Board;

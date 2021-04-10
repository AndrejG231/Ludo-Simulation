import Figure from "./Figure";
import Board from "./Board";

class Player {
  //Player class
  displayName: string;
  maxFigures: number;
  //Maximum number of players figures
  figures: Figure[];
  //List of player's figures
  offset: number;
  //Players offset from start of the board
  board: Board;
  //Players board

  constructor(board: Board, position: number) {
    this.displayName = `Player ${position + 1}`;
    this.offset = (board.size - 1) * position + 1;
    this.board = board;
    this.figures = [];
    this.maxFigures = Math.floor((board.size - 3) / 2);
  }

  hasFigures() {
    return this.figures.length > 0;
  }

  checkFreePosition(position: number) {
    //Check if neither of player's figures are in specified position
    for (const figure of this.figures) {
      if (figure.position === position) {
        return false;
      }
    }
    return true;
  }
}

export default Player;

import Player from "./Player";

class Figure {
  position: number;
  maxPosition: number;
  maxBoardPosition: number; //Maximum position houses excluded
  player: Player;

  constructor(player: Player) {
    this.position = 0;
    this.maxPosition = player.board[0].length + player.board[1].length - 1;
    this.maxBoardPosition = player.board[0].length - 1;
    this.player = player;
  }

  move(diceRoll: number) {
    this.position = this.position + diceRoll;
    //Adding figure position
    if (this.position <= this.maxBoardPosition) {
      //If next position is not in house, check if other player's figures can be kicked
      this.player.board.handleMove(this, diceRoll);
      //Removing other players figures on the spot
    }
  }

  canMove(diceRoll: number) {
    const nextPosition = this.position + diceRoll;

    /*
    If nextPosition is in board and no other players figure is there,
    figure can be moved
    */

    if (nextPosition < this.maxPosition) {
      return this.player.checkFreePosition(nextPosition);
    }
    return false;
  }
  isInHome() {
    return this.position > this.maxBoardPosition;
  }
  loadIntoBoard() {
    const board = this.player.board;
    //Method that loads current figure
    let boardIndex = 0;
    let boardPosition = this.position + this.player.offset;

    if (this.isInHome) {
      boardIndex = this.player.position + 1;
      boardPosition = this.position - this.maxBoardPosition;
    }

    board[boardIndex][boardPosition] = this.player.symbol;
  }
}

export default Figure;

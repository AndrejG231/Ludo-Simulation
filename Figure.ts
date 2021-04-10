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
    this.position += diceRoll;
  }

  canMoveInHouse(diceRoll: number) {
    const nextPosition = this.position + diceRoll;

    //If figure is already home and next position is not over board limits:
    if (
      this.position > this.maxBoardPosition &&
      nextPosition <= this.maxPosition
    ) {
      //Check if no other figure is in nextPosition:
      return this.player.checkFreePosition(nextPosition);
    }
    return false;
  }
}

export default Figure;

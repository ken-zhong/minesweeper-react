export class Tile {
  constructor (bombFlag = false, pos) {
    this.bomb = bombFlag;
    this.pos = pos;
    this.value = null;
    this.flagged = false;
    this.revealed = false;
  }

  toggleFlag () {
    if (this.revealed) {
      return false;
    } else {
      this.flagged = !this.flagged;
      return true;
    }
  }

  revealTile () {
    if (!this.bomb) {
      this.revealed = true;
      return true;
    } else {
      // a false return from this means it's game over!
      return false;
    }
  }

  setPos (pos) {
    this.pos = pos;
  }
}

export class Board {
  constructor (difficulty = 'medium') {
    this.grid = [];
    this.diff = difficulty;
    this.setupBoard();
  }

  setupBoard () {
    let size = Board.DIFFICULTY_LEVELS[this.diff].gridSize;
    let numMines = Board.DIFFICULTY_LEVELS[this.diff].numMines;
    for (let i = 0; i < size; i++) {
      let row = [];
      for (let j = 0; j < size; j++) {
        if (numMines > 0) {
          let newMine = new Tile(true, [i, j]);
          row.push(newMine);
          numMines--;
        } else {
          let newTile = new Tile(false, [i, j]);
          row.push(newTile);
        }
      }
      this.grid.push(row);
    }
    this.setTileValues();
  }

  setTileValues () {
    this.grid.forEach(row => {
      row.forEach(tile => {
        
      });
    });
  }

  revealPos () {

  }

  flagBomb () {

  }

  triggerGameOver () {

  }

  isWon () {
    return this.grid.every(row => {
      return row.every(tile => {
        // win condition: every non-bomb tile is revealed
        if (!tile.bomb) {
          return tile.revealed;
        } else {
          return true;
        }
      });
    });
  }

  onBoard (pos) {
    return (
      pos[0] >= 0 && pos[0] < this.gridSize &&
        pos[1] >= 0 && pos[1] < this.gridSize
    );
  }
}

Board.DIFFICULTY_LEVELS = {
  'easy': {gridSize: 8, numMines: 10},
  'medium': {gridSize: 16, numMines: 40},
  'hard': {gridSize: 24, numMines: 99}
};

Tile.DELTAS = [[-1, -1], [-1, 0], [-1, 1], [0, -1],
         [0, 1], [1, -1], [1, 0], [1, 1]];

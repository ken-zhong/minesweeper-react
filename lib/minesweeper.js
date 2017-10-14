export class Tile {
  constructor (mineFlag = false) {
    this.mine = mineFlag;
    this.pos = null;
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
    if (!this.mine) {
      this.revealed = true;
      return this.value;
    } else {
      // a negative return from this means it's game over!
      return false;
    }
  }

  setPos (pos) {
    this.pos = pos;
  }

  static generateTiles (numTiles, numMines) {
    const result = [];
    for (let i = 0; i < numMines; i++) {
      let mine = new Tile(true);
      result.push(mine);
    }
    while (result.length < numTiles) {
      let tile = new Tile(false);
      result.push(tile);
    }
    // shuffle array with Fisher-Yates algorithm
    for (let j = result.length - 1; j >= 0; j--) {
      let newIdx = Math.floor(Math.random() * (j + 1));
      [result[j], result[newIdx]] = [result[newIdx], result[j]];
    }
    return result;
  }
}

export class Board {
  constructor (difficulty = 'medium') {
    // we will store the board as a 2d grid of tiles
    this.grid = [];
    this.diff = difficulty;
    this.setupBoard();
    this.setTileValues();
  }

  setupBoard () {
    let size = Board.DIFFICULTY_LEVELS[this.diff].gridSize;
    let numMines = Board.DIFFICULTY_LEVELS[this.diff].numMines;
    const tiles = Tile.generateTiles(size * size, numMines);
    for (let i = 0; i < size; i++) {
      let row = [];
      for (let j = 0; j < size; j++) {
        row.push(tiles.pop());
      }
      this.grid.push(row);
    }
    console.log(this.grid);
  }

  getTile (pos) {
    let [x, y] = pos;
    return this.grid[x][y];
  }

  setTileValues () {
    this.grid.forEach((row, x) => {
      row.forEach((tile, y) => {
        if (!tile.mine) {
          // set the value
        }
      });
    });
  }

  getNeighbors (pos) {

  }

  revealPos () {

  }

  flagmine () {

  }

  triggerGameOver () {
    this.grid.forEach((row, x) => {
      row.forEach((tile, y) => {
        tile.revealTile();
      });
    });
  }

  isWon () {
    return this.grid.every(row => {
      return row.every(tile => {
        // win condition: every non-mine tile is revealed
        if (!tile.mine) {
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

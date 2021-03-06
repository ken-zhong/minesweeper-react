// this file contains the 'back end' logic of the game

export class Tile {
  constructor (mineFlag = false) {
    this.mine = mineFlag;
    this.pos = null;
    this.value = null;
    this.flagged = false;
    this.revealed = false;
  }

  toggleFlag () {
    if (!this.revealed) {
      this.flagged = !this.flagged;
    }
  }

  revealTile () {
    this.revealed = true;
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

Tile.DELTAS = [[-1, -1], [-1, 0], [-1, 1], [0, -1],
         [0, 1], [1, -1], [1, 0], [1, 1]];

export class Board {
  constructor (difficulty = 'medium') {
    // we will store the board as a 2d grid of tiles
    this.grid = [];
    this.diff = difficulty;
    this.gridSize = Board.DIFFICULTY_LEVELS[difficulty].gridSize;
    this.numMines = Board.DIFFICULTY_LEVELS[difficulty].numMines;
    this.gameOver = false;
    this.setupBoard();
    this.setTileValues();
  }

  mineCounter () {
    let result = this.numMines;
    this.grid.forEach(row => {
      row.forEach(tile => {
        if (tile.flagged) {
          result--;
        }
      });
    });
    return result;
  }

  setupBoard () {
    let size = this.gridSize;
    const tiles = Tile.generateTiles(size[0] * size[1], this.numMines);
    for (let i = 0; i < size[0]; i++) {
      let row = [];
      for (let j = 0; j < size[1]; j++) {
        let tile = tiles.pop();
        tile.setPos([i, j]);
        row.push(tile);
      }
      this.grid.push(row);
    }
  }

  getTile (pos) {
    return this.grid[pos[0]][pos[1]];
  }

  setTileValues () {
    this.grid.forEach((row, x) => {
      row.forEach((tile, y) => {
        if (!tile.mine) {
          let neighbors = this.getNeighbors([x, y]);
          tile.value = neighbors.reduce((acc, tile) => (tile.mine ? acc + 1 : acc + 0), 0);
        } else {
          tile.value = '💣';
        }
      });
    });
  }

  getNeighbors (pos) {
    const result = [];
    Tile.DELTAS.forEach((delta) => {
      let newPos = [pos[0] + delta[0], pos[1] + delta[1]];
      if (this.onBoard(newPos)) {
        let tile = this.getTile(newPos);
        result.push(tile);
      }
    });
    return result;
  }

  revealPos (pos) {
    const tile = this.getTile(pos);
    if (tile.mine) {
      this.triggerGameOver();
    } else if (tile.value > 0) {
      tile.revealTile();
    } else if (tile.value === 0 && !tile.revealed) {
      tile.revealTile();
      const neighbors = this.getNeighbors(pos);
      neighbors.forEach(neighbor => {
        this.revealPos(neighbor.pos);
      });
    }
  }

  chord (pos) {
    // first get neighbors
    // do nothing if flagged neighbors < value
    // if >=, then reveal all neighbors, triggering game over if a flag is incorrectly placed
    const tile = this.getTile(pos);
    const neighbors = this.getNeighbors(pos);
    if (tile.value <= neighbors.reduce((acc, el) => el.flagged ? acc + 1 : acc, 0)) {
      neighbors.forEach(neighbor => {
        if (!neighbor.flagged) {
          this.revealPos(neighbor.pos);
        }
      });
    }
  }

  flagmine (pos) {
    this.getTile(pos).toggleFlag();
  }

  triggerGameOver () {
    this.grid.forEach((row, x) => {
      row.forEach((tile, y) => {
        if (tile.mine) {
          tile.revealTile();
        }
      });
    });
    this.gameOver = true;
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
      pos[0] >= 0 && pos[0] < this.gridSize[0] &&
        pos[1] >= 0 && pos[1] < this.gridSize[1]
    );
  }
}

Board.DIFFICULTY_LEVELS = {
  'easy': {gridSize: [8, 8], numMines: 10},
  'medium': {gridSize: [16, 16], numMines: 40},
  'hard': {gridSize: [16, 30], numMines: 99},
  'hardMobile': {gridSize: [30, 16], numMines: 99}
};

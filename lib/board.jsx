import React from 'react';
import Tile from './tile.jsx';

class Board extends React.Component {
  constructor (props) {
    super(props);
    this.gameBoard = props.gameBoard;
    this.updateBoard = props.updateBoard;
    this.state = {board: this.gameBoard};
  }

  render () {
    const header = this.getHeader();
    return (
      <div>
        { header }
        <div className='board'>
          { this.gameBoard.grid.map((row, idx) => {
            return (
              <div className='row' key={idx}>
                {row.map((tile, jdx) => <Tile gameBoard={this.gameBoard} updateBoard={this.updateBoard} gameTile={tile} key={`${idx}${jdx}`} />)}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  getHeader () {
    if (this.gameBoard.isWon()) {
      return (
        <header>
          <h3>Congratulations! You won!</h3>
          <p className='new-game'>Play again? <button className='btn-easy' onClick={this.props.resetGame}>New Game</button></p>
        </header>
      );
    } else if (this.gameBoard.gameOver) {
      return (
        <header>
          <h3>Oops! Game over!</h3>
          <p className='new-game'>Play again? <button className='btn-easy' onClick={this.props.resetGame}>New Game</button></p>
        </header>
      );
    } else {
      return (
        <header>
          <p>Left click to reveal a tile.</p>
          <p>Right click to flag a tile</p>
          <p>Alt + left click to 'chord' around a tile (*still WIP*)</p>
        </header>
      );
    }
  }
}

export default Board;

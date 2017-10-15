import React from 'react';
import * as Minesweeper from './minesweeper.js';
import Board from './board.jsx';

class Game extends React.Component {
  constructor (props) {
    super(props);

    // TODO change this to true
    this.state = {showTitleScreen: false};
    // TODO temp delete
    this.gameBoard = new Minesweeper.Board('easy');
  }

  startGame (difficulty) {
    this.gameBoard = new Minesweeper.Board(difficulty);
  }

  render () {
    if (this.state.showTitleScreen) {
      return (
        <div className='titleScreen'>
          <h3>Select your difficulty level</h3>
          <button onClick={() => this.startGame('easy')}>Easy</button>
          <button onClick={() => this.startGame('medium')}>Medium</button>
          <button onClick={() => this.startGame('hard')}>Hard</button>
        </div>
      );
    } else {
      return (
        <Board gameBoard={this.gameBoard} />
      );
    }
  }
}

export default Game;

import React from 'react';
import * as Minesweeper from './minesweeper.js';
import Board from './board.jsx';
import * as Util from './util.js';

class Game extends React.Component {
  constructor (props) {
    super(props);
    this.state = {showTitleScreen: true};
    this.updateBoard = this.updateBoard.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  updateBoard () {
    // this will call a re-render of the entire board
    this.setState({board: this.gameBoard});
  }

  startGame (difficulty) {
    // if on mobile, I want to transpose this grid
    this.gameBoard = new Minesweeper.Board(difficulty);
    if (Util.isMobile()) {
      let newGrid = Util.transpose(this.gameBoard.grid);
      this.gameBoard.grid = newGrid;
    }
    this.setState({showTitleScreen: false});
  }

  resetGame () {
    this.setState({showTitleScreen: true});
  }

  render () {
    if (this.state.showTitleScreen) {
      return (
        <div className='titleScreen'>
          <h3>Select your difficulty level</h3>
          <button className='btn-easy' onClick={() => this.startGame('easy')}>Easy</button>
          <button className='btn-med' onClick={() => this.startGame('medium')}>Medium</button>
          <button className='btn-hard' onClick={() => this.startGame('hard')}>Hard</button>
        </div>
      );
    } else {
      return (
        <Board gameBoard={this.gameBoard} updateBoard={this.updateBoard} resetGame={this.resetGame} />
      );
    }
  }
}

export default Game;

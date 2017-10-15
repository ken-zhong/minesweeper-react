import React from 'react';
import * as Minesweeper from './minesweeper.js';
import Board from './board.jsx';

class Game extends React.Component {
  constructor (props) {
    super(props);
    this.state = {showTitleScreen: true};
  }

  startGame (difficulty) {
    this.gameBoard = new Minesweeper.Board(difficulty);
    this.setState({showTitleScreen: false});
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
        <Board gameBoard={this.gameBoard} />
      );
    }
  }
}

export default Game;

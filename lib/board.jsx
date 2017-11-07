import React from 'react';
import Header from './board_header.jsx';
import Tile from './tile.jsx';

class Board extends React.Component {
  constructor (props) {
    super(props);
    this.gameBoard = props.gameBoard;
    this.updateBoard = props.updateBoard;
    this.state = {
      board: this.gameBoard,
      gameTime: 0
    };
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.startTimer();
  }

  startTimer () {
    this.timer = window.setInterval(() => {
      let newTime = this.state.gameTime + 1;
      this.setState({gameTime: newTime});
    }, 1000);
  }

  stopTimer () {
    clearInterval(this.timer);
  }

  formatNumString (num) {
    switch (num) {
      case num > 999: return 999;
      case num > 99: return num;
      case num > 9: return '0' + num;
      default: return '00' + num;
    }
  }

  render () {
    if (this.gameBoard.gameOver) {
      this.stopTimer();
    }
    return (
      <div>
        <Header gameBoard={this.gameBoard} resetGame={this.props.resetGame} />
        <div className='board'>
          <div className='timer-container'>
            <span>{ this.formatNumString(this.gameBoard.mineCounter()) }</span>
            <span className='reset-smiley'>😃</span>
            <span>{ this.formatNumString(this.state.gameTime) }</span>
          </div>
          { this.gameBoard.grid.map((row, idx) => {
            return (
              <div className='row' key={idx}>
                {row.map((tile, jdx) => <Tile gameBoard={this.gameBoard}
                  updateBoard={this.updateBoard} gameTile={tile}
                  key={`${idx}${jdx}`} />)}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Board;

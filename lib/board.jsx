import React from 'react';
import Header from './board_header.jsx';
import Tile from './tile.jsx';
import ReactModal from 'react-modal';
import Leaderboard from './leaderboard.jsx';
import * as ApiUtil from './util';

class Board extends React.Component {
  constructor (props) {
    super(props);
    this.gameBoard = props.gameBoard;
    this.updateBoard = props.updateBoard;
    this.state = {
      board: this.gameBoard,
      gameTime: 0,
      openModal: false,
      uploadText: ''
    };
    this.startTimer();
  }

  componentWillUnmount () {
    this.stopTimer();
  }

  startTimer () {
    this.timer = window.setInterval(() => {
      let newTime = this.state.gameTime + 1;
      this.setState({gameTime: newTime});
    }, 1000);
  }

  stopTimer () {
    clearInterval(this.timer);
    if (this.gameBoard.isWon()) { this.setState({openModal: true}); }
  }

  closeModal () {
    this.setState({openModal: false})
  }

  formatNumString (num) {
    switch (true) {
      case num > 999: return 999;
      case num > 99: return num;
      case num > 9: return '0' + num;
      default: return '00' + num;
    }
  }

  handleInput (e) {
    this.setState({uploadText: e.target.value})
  }

  handleSubmit () {
    let data = {
      username: this.state.uploadText,
      score: this.state.gameTime,
      difficulty: this.gameBoard.diff
    };
    ApiUtil.submitScore(data);
    this.closeModal()
  }

  render () {
    if (this.gameBoard.gameOver || this.gameBoard.isWon()) {
      this.stopTimer();
    }
    return (
      <div>
        <Header gameBoard={this.gameBoard} resetGame={this.props.resetGame} />
        <div className='board'>
          <div className='timer-container'>
            <span>{ this.formatNumString(this.gameBoard.mineCounter()) }</span>
            <span onClick={this.props.resetGame} className='reset-smiley'>
              { this.gameBoard.gameOver ? '🤣' : '😃' }
            </span>
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
        { this.gameBoard.isWon() ? <Leaderboard /> : null }
        <ReactModal isOpen={this.state.openModal} className='upload-modal'
          onRequestClose={this.closeModal.bind(this)}>
          <div className='upload-container'>
            <h2>Congratulations! You Won!</h2>
            <p>Your score is: {this.state.gameTime} seconds.
              <br />
              Would you like to submit your score?</p>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <label>Your name:
                <input type='text' value={this.state.uploadText} onChange={this.handleInput.bind(this)} />
              </label>
              <br />
              <button className='btn-easy'>Submit</button>
            </form>
          </div>
        </ReactModal>
      </div>
    );
  }
}

export default Board;

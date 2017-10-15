import React from 'react';

class Tile extends React.Component {
  constructor (props) {
    super(props);
    this.gameTile = props.gameTile;
    this.gameBoard = props.gameBoard;
    this.updateBoard = props.updateBoard;
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (e) {
    e.preventDefault();
    if (e.nativeEvent.which === 1) {
      if (!this.gameTile.flagged) {
        this.gameBoard.revealPos(this.gameTile.pos);
      }
    } else if (e.nativeEvent.which === 3) {
      this.gameTile.toggleFlag();
    }
    this.updateBoard();
  }

  render () {
    let toRender = '';
    let classNames = 'tile';
    if (this.gameTile.revealed) {
      toRender = (this.gameTile.value === 0 ? '' : this.gameTile.value);
      classNames += ' revealed';
    } else if (this.gameTile.flagged) {
      toRender = '🚩';
    }
    if (this.gameBoard.gameOver) {
      return <div className={classNames}>{toRender}</div>;
    } else {
      return <div onClick={this.handleClick} onContextMenu={this.handleClick} className={classNames}>{toRender}</div>;
    }
  }
}

export default Tile;

import React from 'react';

class Tile extends React.Component {
  constructor (props) {
    super(props);
    this.gameTile = props.gameTile;
    this.gameBoard = props.gameBoard;
    this.updateBoard = props.updateBoard;
  }

  handleClick () {
    this.gameBoard.revealPos(this.gameTile.pos);
    this.updateBoard();
  }

  render () {
    let toRender = '';
    let classNames = 'tile';
    if (this.gameTile.revealed) {
      toRender = (this.gameTile.value === 0 ? '' : this.gameTile.value);
      classNames += ' revealed'
    } else if (this.gameTile.flagged) {
      toRender = '🚩';
    }
    return <div onClick={this.handleClick.bind(this)} className={classNames}>{toRender}</div>;
  }
}

export default Tile;

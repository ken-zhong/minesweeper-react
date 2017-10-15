import React from 'react';
import Tile from './tile.jsx';

class Board extends React.Component {
  constructor (props) {
    super(props);
    this.gameBoard = props.gameBoard;
  }

  render () {
    return (
      <div className='board'>
        { this.gameBoard.grid.map((row, idx) => {
          return (
            <div className='row' key={idx}>
              {row.map((tile, jdx) => <Tile gameTile={tile} key={`${idx}${jdx}`} />)}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Board;

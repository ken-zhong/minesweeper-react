import React from 'react';

const BoardHeader = (props) => {
  if (props.gameBoard.isWon()) {
    return (
      <header>
        <h3>Congratulations! You won!</h3>
        <p className='new-game'>Play again? <button className='btn-easy' onClick={props.resetGame}>New Game</button></p>
      </header>
    );
  } else if (props.gameBoard.gameOver) {
    return (
      <header>
        <h3>Oops! Game over!</h3>
        <p className='new-game'>Play again? <button className='btn-easy' onClick={props.resetGame}>New Game</button></p>
      </header>
    );
  } else {
    return (
      <header>
        <p>Left click to reveal a tile.</p>
        <p>Right click to flag a tile</p>
        <p>Click an already revealed tile to 'chord'</p>
      </header>
    );
  }
};

export default BoardHeader;

import React from 'react';
import ReactDOM from 'react-dom';
import Game from './game.jsx';

const Main = (props) => {
  return (
    <div>
      <h1>Minesweeper</h1>
      <Game />
    </div>
  );
};

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  ReactDOM.render(<Main />, root);
});

// questions:
// how to get long press == right click?
// when to separate out components? see board.getHeader;

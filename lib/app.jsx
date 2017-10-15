import React from 'react';
import ReactDOM from 'react-dom';
import Game from './game.jsx';

const Main = (props) => {
  return (
    <div>
      <h1>Minesweeper</h1>
      <p>Right click to reveal a tile</p>
      <p>Alt + right click to flag a tile</p>
      <Game />
    </div>
  );
};

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  ReactDOM.render(<Main />, root);
});

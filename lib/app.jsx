import React from 'react';
import ReactDOM from 'react-dom';

const Main = (props) => {
  return (
    <h1>Minesweeper</h1>
  );
};

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  ReactDOM.render(<Main />, root);
});

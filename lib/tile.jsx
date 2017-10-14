import React from 'react';

export class Tile extends React.Component {
  constructor (props) {
    super(props);
    this.gameTile = this.props.gameTile;
  }

  render () {
    return <span className='tile'>T</span>;
  }
}

export default Tile;

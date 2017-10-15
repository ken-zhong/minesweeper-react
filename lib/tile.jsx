import React from 'react';

export class Tile extends React.Component {
  constructor (props) {
    super(props);
    this.gameTile = this.props.gameTile;
  }

  render () {
    return <div className='tile'>{this.gameTile.value}</div>;
  }
}

export default Tile;

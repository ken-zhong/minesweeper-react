import React from 'react';
import * as ApiUtil from './util';

class Leaderboard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      easy: [],
      medium: [],
      hard: []
    };
  }

  componentDidMount () {
    Object.keys(this.state).forEach(difficulty => {
      ApiUtil.getHighScores(difficulty).then(res => {
        this.setState({[difficulty]: res});
      });
    });
  }

  formatList (difficulty) {
    if (this.state[difficulty].length === 0) {
      return (
        <div>Loading...</div>
      );
    } else {
      return (
        <div>
          <h3>{ difficulty }</h3>
          <ol>
            { this.state[difficulty].map(el => {
              return <li>{el.username} - {el.score} seconds</li>;
            }) }
          </ol>
        </div>
      );
    }
  }

  render () {
    let easyList = this.formatList('easy');
    let mediumList = this.formatList('medium');
    let hardList = this.formatList('hard');

    return (
      <div>
        <h2>Current Leaderboard</h2>
        { easyList }
        { mediumList }
        { hardList }
      </div>
    );
  }
}

export default Leaderboard;

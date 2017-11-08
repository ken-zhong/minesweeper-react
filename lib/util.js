import $ from 'jquery';

// found this mobile checker here!
// https://coderwall.com/p/i817wa/one-line-function-to-detect-mobile-devices-with-javascript
export function isMobile () {
  return (typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

// just in case the Heroku dyno is asleep!
export function wakeServer () {
  return $.ajax({
    url: 'https://minesweeper-r.herokuapp.com/'
  });
}

export function getHighScores (difficulty) {
  return $.ajax({
    url: `localhost:3000/api/scores${difficulty}`
    // url: `https://minesweeper-r.herokuapp.com/api/scores/${difficulty}`
  });
}

export function submitScore (scoreData) {
  return $.ajax({
    url: 'https://minesweeper-r.herokuapp.com/api/scores',
    method: 'POST',
    data: scoreData
  });
}

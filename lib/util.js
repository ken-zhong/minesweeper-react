/* global fetch */

// found this mobile checker here!
// https://coderwall.com/p/i817wa/one-line-function-to-detect-mobile-devices-with-javascript
export function isMobile () {
  return (typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

// just in case the Heroku dyno is asleep!
export function wakeServer () {
  fetch('https://high-scores-kenzhong.c9users.io/')
  .then((res) => res.json()).then(body => console.log(body));
}

export function getHighScores () {
  return 'hi';
}

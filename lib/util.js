export function transpose (arr) {
  let grid = arr.slice(0);
  let result = grid[0].map((col, i) => {
    return grid.map((row) => {
      return row[i];
    });
  });
  return result;
}

// found this mobile checker here!
// https://coderwall.com/p/i817wa/one-line-function-to-detect-mobile-devices-with-javascript
export function isMobile () {
  return (typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

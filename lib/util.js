// found this mobile checker here!
// https://coderwall.com/p/i817wa/one-line-function-to-detect-mobile-devices-with-javascript
export function isMobile () {
  return (typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

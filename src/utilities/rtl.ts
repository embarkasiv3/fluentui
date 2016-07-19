import { KeyCodes } from './KeyCodes';

let _isRTL: boolean;

/**
 * Gets the rtl state of the page (returns true if in rtl.)
 */
export function getRTL(): boolean {
  if (_isRTL === undefined) {
    _isRTL = document.documentElement.getAttribute('dir') === 'rtl';
  }

  return _isRTL;
}

/**
 * Sets the rtl state of the page (by adjusting the dir attribute of the html element.)
 */
export function setRTL(isRTL: boolean) {
  document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
  _isRTL = isRTL;
}

/**
 * Returns the given key, but flips right/left arrows if necessary.
 */
export function getRTLSafeKeyCode(key: number): number {
  if (getRTL()) {
    if (key === KeyCodes.left) {
      key = KeyCodes.right;
    } else if (key === KeyCodes.right) {
      key = KeyCodes.left;
    }
  }

  return key;
}

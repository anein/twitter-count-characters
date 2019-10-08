// tslint:disable-next-line:no-typeof-undefined
export const Browser = typeof browser === 'undefined' ? chrome : browser;
// tslint:disable-next-line:no-typeof-undefined
export const isMozilla = typeof browser !== 'undefined';

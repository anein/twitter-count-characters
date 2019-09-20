import { IOptions } from '@base/interface/options';

export interface IListener {
  /**
   * Default timeout of the interval method
   */
  timeout: number;
  /**
   * DOM query expression, e.g. `.my-class`
   */
  query: string;
  /**
   * HTML Element
   */
  element: HTMLElement;
  /**
   *
   */
  options: IOptions;

  /**
   * Initialises listener by calling setInterval method to check if element exists in DOM,
   * and if it exists, executes the draw method.
   */
  listen: () => void;

  /**
   * Draws the counter and attaches observer to it
   */
  draw: (element: HTMLElement) => void;

  /**
   * This method will be called If the state of the options will be updated.
   */
  onOptionsUpdate: () => void;

  /**
   * Disconnects the observer from element
   */
  clearObserver: () => void;
}

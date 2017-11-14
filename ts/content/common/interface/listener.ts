import { IElement } from "@/base/model/interface/element";

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
   * Stores the counter box
   */
  // counter: IElement;
  /**
   * Stores the circle indicator
   */
  // circle: IElement;
  /**
   * Default length of the standard tweet
   */
  maxTweetLength: number;

  /**
   *
   */
  notifyLimitation: boolean;

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
   * Stops setInterval
   */
  clearTimer: () => void;

  /**
   * Disconnects the observer from element
   */
  clearObserver: () => void;

}

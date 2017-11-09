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
   * Default length of the standard tweets
   */
  maxTweetLength: number;

  /**
   * Initialises listener by calling setInterval method to check if element exists in DOM,
   * and if it exists, executes the draw method.
   */
  listen: () => void;

  /**
   * Draws the counter and attaches observer to it.
   */
  draw: (element: HTMLElement) => void;

}

export interface IElement {

  element?: HTMLElement | any;

  /**
   * Shows element
   */
  show: () => void;

  /**
   * Hides element
   */
  hide: () => void;

  /**
   * Sets the `warn` class to element
   */
  warn: () => void;

  /**
   * Sets the `danger` class to the element
   */
  danger: () => void;

  /**
   * Removes all added classes
   */
  clear: () => void;

  /**
   * Sets value to the `innerText` attribute of element
   */
  setText?: (value: string) => void;
  /**
   * Sets the `pulse` class to the element
   */
  pulse?: () => void;

  /**
   * Returns element itself.
   */
  get?: () => HTMLElement | any;

  disable?: () => void;

  enable?: () => void;

}

import { Style } from "@/content/common/constants/styles";
import { IListener } from "@/content/common/interface/listener";

export class BaseListener implements IListener {

  // Default timeout for interval
  public timeout: number = 500;

  public maxTweetLength: number;

  public notifyLimitation: boolean;

  public counter: HTMLElement;

  public circle: HTMLElement;

  // attached observer
  protected observer: MutationObserver = null;

  //
  protected checkObserver: boolean = true;

  // timer id
  private __timer: number;

  // DOM query expression, e.g. `.my-class`
  private __query: string;

  public get query(): string {
    return this.__query;
  }

  public set query(value: string) {
    this.__query = value;
  }

  public get element(): HTMLElement | null {
    return (document.querySelector(this.query) as HTMLElement) || null;
  }

  public listen(): void {

    this.clearTimer();

    this.__timer = setInterval(() => {

      if (this.element && (!this.observer || !this.checkObserver)) {

        this.draw(this.element);

      } else if (this.element === null && this.observer) {

        this.clearObserver();
      } else {
        // o_O, or for some other purposes
      }

    }, this.timeout);

  }

  public draw(element: HTMLElement): void {
    //
  }

  /**
   * Calculates remaining text length
   *
   * @param {number} length - current text length
   * @returns {string}
   */
  public calculateLength(length: number): string {
    return (this.maxTweetLength - length).toString();
  }

  /**
   * Clear timer if it was set.
   */
  public clearTimer(): void {
    if (this.__timer) {
      clearInterval(this.__timer);
    }
  }

  /**
   * Clear observer object if it was set.
   */
  public clearObserver(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = undefined;
    }
  }

  /**
   * Sets length to the counter block, and styles to the circle and counter blocks
   * .
   * @param {number} length - text length
   */
  protected setLengthAndStyles(length) {

    const remainingLength = this.calculateLength(length);

    this.counter.innerText = remainingLength;

    this.setStyles(~~remainingLength);

  }

  /**
   * Sets a appropriate class to the counter and circle based on length.
   * In fact, there are boring "if" conditions here.
   *
   * TODO: optimize.
   *
   * @param {number} length - text length
   */
  protected setStyles(length: number) {

    this.counter.classList.remove(Style.WARN, Style.DANGER);

    if (this.notifyLimitation) {

      this.circle.classList.remove(Style.WARN, Style.DANGER);

      if (length > -this.maxTweetLength && length <= 0) {

        this.circle.classList.add(Style.WARN);
        this.counter.classList.add(Style.WARN);

        if (length === 0) {
          this.circle.classList.add(Style.T_PULSE, Style.T_A_PULSE);
        }
      } else if (length <= -this.maxTweetLength) {
        this.circle.classList.add(Style.DANGER);
        this.counter.classList.add(Style.DANGER);
      }

    } else {
      if (length > 20) {
        this.circle.classList.remove(Style.WARN, Style.DANGER, Style.T_PULSE, Style.T_A_PULSE);
        this.counter.classList.remove(Style.WARN, Style.DANGER);
      } else if (length > 0 && length <= 20) {
        this.counter.classList.add(Style.WARN);
        this.circle.classList.remove(Style.DANGER);
      } else {
        this.counter.classList.add(Style.DANGER);
        this.circle.classList.remove(Style.WARN);
      }
    }

  }

}

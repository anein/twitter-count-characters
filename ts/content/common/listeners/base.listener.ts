import { Composite } from "@/base/composite";
import { IOptions } from "@/base/interface/options";
import { Circle } from "@/base/model/circle";
import { IElement } from "@/base/model/interface/element";
import { Selector } from "@/content/common/constants/selectors";
import { Style } from "@/content/common/constants/styles";
import { IListener } from "@/content/common/interface/listener";

export class BaseListener implements IListener {

  // Default timeout for interval
  public timeout: number = 500;

  public maxTweetLength: number;

  public options: IOptions;

  public controlElements: Composite = new Composite();

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
   * Clears timer if it was set.
   */
  public clearTimer(): void {
    if (this.__timer) {
      clearInterval(this.__timer);
    }
  }

  /**
   * Clears observer object if it was set.
   */
  public clearObserver(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = undefined;
    }
  }

  /**
   * Removes any cloned buttons from container using the `Selector.BUTTON_CLONE` selector.
   *
   * @param {HTMLElement} container - container of buttons
   */
  public removeClonedButtons(container: HTMLElement): void {

    const elements = container.getElementsByClassName(Selector.BUTTON_CLONE) as any;

    for (const item of elements) {
      item.remove();
    }

  }

  /**
   * Sets length to the counter block, and styles to the circle and counter blocks
   * .
   * @param {number} length - text length
   */
  protected setLengthAndStyles(length) {

    const remainingLength = this.calculateLength(length);

    this.controlElements.setText(remainingLength);

    this.setStyles(~~remainingLength);

  }

  /**
   * Sets an appropriate class to the counter and circle based on length.
   * In fact, there are boring "if" conditions here.
   *
   * TODO: optimize.
   *
   * @param {number} length - text length
   */
  protected setStyles(length: number) {

    if (this.options.limit && !this.options.mode) {

      if (length > -this.maxTweetLength && length <= 0) {

        this.controlElements.warn();

        if (length === 0) {
          this.controlElements.pulse();
        }

      } else if (length <= -this.maxTweetLength) {
        this.controlElements.danger();
      } else {
        this.controlElements.clear();
      }
    } else {
      // console.log(length);
      if (length < 0) {
        this.controlElements.disable();
        this.controlElements.danger();
      } else {
        this.controlElements.enable();
        if (length >= 0 && length <= 20) {
          this.controlElements.warn();
        } else {
          this.controlElements.clear();
        }

      }
    }

  }

}

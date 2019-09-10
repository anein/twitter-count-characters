import { Composite } from '@/base/composite';
import { IOptions } from '@/base/interface/options';
import { Circle } from '@/base/model/circle';
import { IElement } from '@/base/model/interface/element';
import { Selector } from '@/content/common/constants/selectors';
import { Style } from '@/content/common/constants/styles';
import { IListener } from '@/content/common/interface/listener';
import { Limit } from '@/content/common/constants/limits';

export abstract class BaseListener implements IListener {
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
  private __timerId: any;

  // DOM query expression, e.g. `.my-class`
  private __query: string;

  //
  private __element: HTMLElement;

  public get query(): string {
    return this.__query;
  }

  public set query(value: string) {
    this.__query = value;
  }

  public get element(): HTMLElement | null {
    if (!this.__element) {
      this.__element = document.querySelector(this.query) || null;
    }

    return this.__element;
  }
  public set element(value: HTMLElement) {
    this.__element = value;
  }

  public abstract draw(element: HTMLElement): void;

  public listen(): void {
    this.clearTimer();

    this.__timerId = setInterval(() => {
      if (this.element && (!this.observer || !this.checkObserver)) {
        this.draw(this.element);
      } else if (this.element === null && this.observer) {
        this.clearObserver();
      } else {
        // o_O, or for some other purposes
      }
    }, this.timeout);
  }

  /**
   * Calculates remaining text length
   *
   * @param {number} length - current text length
   * @returns {string}
   */
  public calculateLength(length: number): string {
    return length.toString();
  }

  /**
   * Clears timer if it was set.
   */
  public clearTimer(): void {
    if (this.__timerId) {
      clearInterval(this.__timerId);
    }
  }

  /**
   * Clears the observer object if it was set.
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
    console.log(length);
    if (this.options.limit && !this.options.mode) {
      // length between 0 and half of the max length
      if (length >= 0 && length <= Limit.SHORT) {
        this.controlElements.warn();

        if (length === 0) {
          this.controlElements.pulse();
        }
      } else if (length < 0) {
        this.controlElements.danger();
      } else {
        this.controlElements.clear();
      }
    } else {
      console.log(length);
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

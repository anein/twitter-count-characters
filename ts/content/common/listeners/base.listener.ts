import { Composite } from '@/base/composite';
import { IOptions } from '@/base/interface/options';
import { Selector } from '@/content/common/constants/selectors';
import { IListener } from '@/content/common/interface/listener';

/**
 * TODO: refactoring.
 */
export abstract class BaseListener implements IListener {
  // Default timeout for the listener.
  public timeout: number = 100;

  public controlElements: Composite = new Composite();

  // attached observer
  protected observer: MutationObserver = null;

  //
  protected checkObserver: boolean = true;

  private __options: IOptions;

  // timer id
  private __timerId: any;

  // DOM query expression, e.g. `.my-class`
  private __query: string;

  public get query(): string {
    return this.__query;
  }

  public set query(value: string) {
    this.__query = value;
  }

  public get element(): HTMLElement | null {
    return document.querySelector(this.query) || null;
  }

  public set options(value: IOptions) {
    this.__options = value;
  }

  public get options(): IOptions {
    return this.__options;
  }

  public abstract draw(element: HTMLElement): void;

  public listen(): void {
    this.clearTimer();

    this.__timerId = setInterval(() => {
      if (this.element && !this.element.querySelector('.ein-counter')) {
        this.draw(this.element);
      } else if (this.element === null && this.observer) {
        this.clearObserver();
      } else {
        // o_O, or for some other purposes
      }
    }, this.timeout);
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
   */
  protected updateCounter(length: number) {
    const value = this.options.maxLength - length;

    this.controlElements.setText(value);

    this.setStyles(value);
  }

  /**
   * Sets an appropriate class to the counter and circle based on length.
   *
   */
  protected setStyles(length: number) {
    if (length < 0) {
      this.controlElements.disable();
      this.controlElements.danger();
    } else {
      this.controlElements.enable();
      if (length === 0) {
        this.controlElements.danger();
      } else if (length > 0 && length <= this.options.warnLength) {
        this.controlElements.warn();
      } else {
        this.controlElements.clear();
      }
    }
  }
}

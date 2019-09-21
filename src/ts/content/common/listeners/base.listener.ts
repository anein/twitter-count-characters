import { Composite } from '@base/composite';
import { IOptions } from '@base/interface/options';
import { Selector } from '@content/common/constants/selectors';
import { IListener } from '@content/common/listeners/base/interface/listener';
import { Listener } from '@content/common/listeners/base/listener';

export abstract class BaseListener extends Listener implements IListener {
  // Default timeout for the listener.
  public timeout: number = 100;

  public controlElements: Composite = new Composite();

  // attached observer
  protected observer: MutationObserver = null;

  private _options: IOptions;

  // timer id
  private _timerId: any;

  // DOM query expression, e.g. `.my-class`
  private _query: string;

  public get query(): string {
    return this._query;
  }

  public set query(value: string) {
    this._query = value;
  }

  public get element(): HTMLElement | null {
    return document.querySelector(this.query) || null;
  }

  public set options(value: IOptions) {
    if (this._options) {
      this._options = value;
      this.onOptionsUpdate();
    } else {
      this._options = value;
    }
  }

  public get options(): IOptions {
    return this._options;
  }

  public listen(): void {
    const callback = () => {
      if (this.element && !this.element.querySelector(Selector.COUNTER)) {
        this.draw(this.element);
      } else if (this.element === null && this.observer) {
        // remove the observer when the element or a parent of the element was removed from the dom.
        // this is mainly needed in that case when the element is a child of the model dialog.
        this.clearObserver();
      } else {
        // o_O, or for some other purposes
      }
      requestAnimationFrame(callback);
    };

    requestAnimationFrame(callback);
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
   * Sets length to the counter block, and styles to the circle and counter blocks
   */
  protected updateCounter(length: number) {
    const value = this._options.maxLength - length;

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
      } else if (length > 0 && length <= this._options.warnLength) {
        this.controlElements.warn();
      } else {
        this.controlElements.clear();
      }
    }
  }
}

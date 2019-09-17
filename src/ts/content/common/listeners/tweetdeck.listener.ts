import { Circle } from '@base/model/circle';
import { Counter } from '@base/model/counter';
import { TD_Selector } from '@content/common/constants/selectors';
import { Style } from '@content/common/constants/styles';
import { BaseListener } from '@content/common/listeners/base.listener';

export class TweetdeckListener extends BaseListener {
  private _sourceCounter: Counter;

  public draw(element: HTMLElement): void {
    this._sourceCounter = new Counter(element.querySelector(TD_Selector.SOURCE_COUNTER));
    const circle = new Circle(element.querySelector(TD_Selector.CIRCLE));

    // create the counter
    const counter = new Counter();
    const styles = [
      ...Array.from(this._sourceCounter.get().classList).filter((item: string) => item !== Style.T_HIDE),
    ] as string[];

    counter.addStyle(styles);
    counter.initValue = this.options.maxLength;

    this.controlElements.add(counter);
    this.controlElements.add(circle);

    element.insertBefore(counter.get(), circle.get().parentElement);

    this._sourceCounter.addStyle([Style.HIDE]);
    this.onOptionsUpdate();

    // set observer to listen the changes of counter text.
    this.observer = new MutationObserver(() => {
      this.updateCounter(this._sourceCounter.length());
    });

    this.observer.observe(this._sourceCounter.get(), { childList: true, subtree: true });
  }

  public onOptionsUpdate() {
    if (!this._sourceCounter) {
      return;
    }

    if (this.options.hideCircle) {
      this.controlElements.hide();
    } else {
      this.controlElements.show();
    }

    this.updateCounter(this._sourceCounter.length());
  }

  protected updateCounter(length: number) {
    const value = length;

    this.controlElements.setText(value);

    this.setStyles(value);
  }
}

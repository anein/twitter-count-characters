import { Button } from '@/base/model/button';
import { Circle } from '@/base/model/circle';
import { Counter } from '@/base/model/counter';
import { Limit } from '@/content/common/constants/limits';
import { Selector, TD_Selector } from '@/content/common/constants/selectors';
import { Style } from '@/content/common/constants/styles';
import { BaseListener } from './base.listener';

export class TweetdeckListener extends BaseListener {
  protected checkObserver: boolean = false;

  public draw(element: HTMLElement): void {
    let counter = new Counter(element.getElementsByClassName(Selector.COUNTER)[0]);

    // check if there's our counter in DOM
    if (counter.notEmpty() && this.controlElements.notEmpty()) {
      return;
    }

    const sourceCounter = new Counter(element.getElementsByClassName(TD_Selector.SOURCE_COUNTER)[0]);

    // get or create a new element to display OUR awesome counter
    // it's needed to not change the source counter element.
    if (!counter.notEmpty()) {
      counter = new Counter(sourceCounter.clone());
      counter.addStyle(Selector.COUNTER);
      counter.clear(TD_Selector.SOURCE_COUNTER, Style.T_HIDE, Style.T_RED);

      sourceCounter.hide();
      sourceCounter.get().parentElement.appendChild(counter.get());
    }

    this.controlElements.add(counter);

    const length = sourceCounter.length();

    this.renderCircle(element);
    // this.renderSubmitButton(element);

    this.updateCounter(length);

    // clear observer, just in case
    this.clearObserver();

    // set observer to listen the changes of counter text.
    this.observer = new MutationObserver(() => {
      this.updateCounter(sourceCounter.length());
    });

    this.observer.observe(sourceCounter.get(), { childList: true, subtree: true });
  }

  /**
   * Renders the circle if the `hide circle` flag is enabled, otherwise hide the circle!
   *
   * @param element
   */
  private renderCircle(element: HTMLElement) {
    const circle = new Circle(element.getElementsByClassName(Selector.CIRCLE)[0]);

    if (this.options.hideCircle) {
      circle.hide();
    } else {
      this.controlElements.add(circle);
    }
  }
  //
  // /**
  //  * Gets the submit button, and adds it to the control collection if the 140 mode is enabled.
  //  */
  // private renderSubmitButton(element: HTMLElement) {
  //   // get the submit button
  //   const button = new Button(element.parentElement.getElementsByClassName(TD_Selector.BUTTON)[0]);
  //   if (this.options.mode) {
  //     this.controlElements.add(button);
  //   } else {
  //     button.enable();
  //   }
  // }
}

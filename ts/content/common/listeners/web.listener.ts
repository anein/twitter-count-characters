import { Circle } from '@/base/model/circle';
import { Counter } from '@/base/model/counter';
import { Limit } from '@/content/common/constants/limits';
import { WEB_Selector } from '@/content/common/constants/selectors';
import { BaseListener } from './base.listener';

export class WebListener extends BaseListener {
  public draw(element: HTMLElement): void {
    // get a circle indicator to catch the text changes
    const circle = new Circle(element.querySelector(WEB_Selector.CIRCLE));

    // clone the circle to replace it with our circle
    const progressbar = new Circle(circle.clone());

    // create the counter
    const counter = new Counter();
    counter.initValue = Limit.LONG;

    element.insertBefore(counter.get(), circle.get().parentNode);
    element.insertBefore(progressbar.get(), circle.get().parentNode);

    // after we added our fake circle, we hide the original circle
    circle.hide(1);

    this.options.hideCircle ? progressbar.hide(0) : this.controlElements.add(progressbar);

    this.controlElements.add(counter);

    // update the counter if there was a draft.
    this.updateCounter(this.getLengthFromReactInstance(element));

    // set observer to listen the changes of text.
    this.observer = new MutationObserver(() => {
      // update the progressbar. In fact, here we get stroke width of the source circle and set it to our fake circle.
      progressbar.setStyle(circle.getStyle());

      // update the counter
      const count = this.getLengthFromReactInstance(element);
      this.updateCounter(count);
    });

    this.observer.observe(circle.get(), { attributes: true, childList: true, subtree: true });

    // It's need to catch changes when the length of tweet  have exceeded the max length
    this.observer.observe(circle.get().parentNode.lastChild, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }

  /**
   * Gets the length value from an instance of the react app.
   */
  public getLengthFromReactInstance(element: Node): number {
    const instance = element[Object.keys(element)[0]];
    return instance.child.stateNode.props.count;
  }
}

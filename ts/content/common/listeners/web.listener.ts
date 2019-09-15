import { Circle } from '@/base/model/circle';
import { Counter } from '@/base/model/counter';
import { Limit } from '@/content/common/constants/limits';
import { WEB_Selector } from '@/content/common/constants/selectors';
import { BaseListener } from './base.listener';

export class WebListener extends BaseListener {
  private root = null;

  public draw(element: HTMLElement): void {
    this.root = element;
    // get a circle indicator to catch the text changes
    const circle = new Circle(element.querySelector(WEB_Selector.CIRCLE));

    // clone the circle to replace it with our circle
    const progressbar = new Circle(circle.clone());

    // create the counter
    const counter = new Counter();
    counter.initValue = Limit.LONG;

    element.insertBefore(counter.get(), circle.get().parentElement);
    element.insertBefore(progressbar.get(), circle.get().parentElement);

    // after we cloned our fake circle, we hide the original circle
    circle.hide(1);

    this.controlElements.add(progressbar);
    this.controlElements.add(counter);

    // update the counter if there was a draft
    this.onOptionsUpdate();

    // set observer to listen the changes of text.
    this.observer = new MutationObserver(() => {
      // update the progressbar. In fact, here we get stroke width of the source circle and set it to our fake circle
      progressbar.setStyle(circle.getStyle());

      // update the counter
      this.updateCounter(this.getLengthFromReactInstance(element));
    });

    this.observer.observe(circle.get(), { attributes: true, childList: true, subtree: true });

    // It's needed to catch changes when the length of tweet  have exceeded the max length
    this.observer.observe(circle.get().parentElement.lastChild, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }

  public onOptionsUpdate() {
    if (!this.root) {
      return;
    }

    if (this.options.hideCircle) {
      this.controlElements.hide();
    } else {
      this.controlElements.show();
    }

    this.updateCounter(this.getLengthFromReactInstance(this.root));
  }

  /**
   * Gets the length value from an instance of the react app.
   */
  public getLengthFromReactInstance(element: Node): number {
    const instance = element[Object.keys(element)[0]];
    return instance.child.stateNode.props.count;
  }
}

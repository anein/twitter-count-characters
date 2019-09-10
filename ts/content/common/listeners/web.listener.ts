import { Button } from '@/base/model/button';
import { Circle } from '@/base/model/circle';
import { Counter } from '@/base/model/counter';
import { WEB_Selector } from '@/content/common/constants/selectors';
import { BaseListener } from './base.listener';
import { Limit } from '@/content/common/constants/limits';

export class WebListener extends BaseListener {
  public draw(element: HTMLElement): void {
    // get a circle indicator to catch the text changes
    const circle = new Circle(element.querySelector(WEB_Selector.CIRCLE));

    // clone the circle to replace it with our circle
    const circle2 = new Circle(circle.clone());

    //
    //
    const counter = new Counter();
    counter.setText(Limit.LONG);

    element.insertBefore(counter.get(), circle.get().parentNode);
    element.insertBefore(circle2.get(), circle.get().parentNode);
    circle.hide(1);
    //
    // // get a tweet box to understand if there was a saved text or not,
    // // and to catch changes.
    // const tweetBox = element.querySelector(Selector.W_BOX_EDITOR);
    //
    // // to observe text length
    // const textarea = element.getElementsByTagName(Selector.TEXTAREA)[0];
    //
    // const counter = new Counter(sourceCounter.clone());
    // counter.clear(Style.T_REACHED);

    const button = new Button(element.querySelector(WEB_Selector.BUTTON));

    // // insert our counter before the source counter, and remove the last.
    // sourceCounter.get().parentElement.insertBefore(counter.get(), sourceCounter.get());
    // sourceCounter.get().remove();
    //
    // // if `old school mode` or `hide circle` flag is enabled, hide the circle!
    // // TODO: optimize
    // this.options.mode || this.options.circle ? circle.hide(1) : this.controlElements.add(circle);
    // if (this.options.mode) {
    this.controlElements.add(circle2);
    this.controlElements.add(button);
    this.controlElements.add(counter);
    // }

    // set observer to listen the changes of text.
    this.observer = new MutationObserver(() => {
      const count = this.getLengthFromReactInstance(element);
      this.setLengthAndStyles(Limit.LONG - count);
    });

    this.observer.observe(circle.get(), { attributes: true, childList: false, subtree: true });
  }

  public getLengthFromReactInstance(element: Node): number {
    const instance = element[Object.keys(element)[0]];
    console.dir(instance.child.stateNode.props);
    return instance.child.stateNode.props.count;
  }
}

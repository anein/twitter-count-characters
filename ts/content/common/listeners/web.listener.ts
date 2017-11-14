import { Circle } from "@/base/model/circle";
import { Counter } from "@/base/model/counter";
import { Selector } from "@/content/common/constants/selectors";
import { Style } from "@/content/common/constants/styles";
import { BaseListener } from "./base.listener";

export class WebListener extends BaseListener {

  public draw(element: any): void {

    let initialContentLength = 0;

    // get a circle indicator
    const circle = new Circle(element.getElementsByClassName(Selector.CIRCLE)[ 0 ]);

    // source box
    const sourceCounter = new Counter(element.getElementsByClassName(Selector.COUNTDOWN_COUNTER)[ 0 ]);

    // get a tweet box to understand if there was a saved text or not,
    // and to catch changes.
    const tweetBox = element.querySelector(Selector.BOX_EDITOR);

    // to observe text length
    const textarea = element.getElementsByTagName(Selector.TEXTAREA)[ 0 ];

    const counter = new Counter(sourceCounter.clone());
    counter.clear(Style.T_REACHED);

    // insert our counter before the source counter, and remove the last.
    sourceCounter.get().parentElement.insertBefore(counter.get(), sourceCounter.get());
    sourceCounter.get().remove();

    this.controlElements.add(circle, counter);

    initialContentLength = (textarea.textLength === 0) ? tweetBox.textContent.length : textarea.textLength;

    // set initial length
    this.setLengthAndStyles(initialContentLength);

    // set observer to listen the changes of text.
    this.observer = new MutationObserver(() => {

      this.setLengthAndStyles(textarea.textLength);

    });

    this.observer.observe(tweetBox, { attributes: true, childList: true, subtree: true });

  }

}

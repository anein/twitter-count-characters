import { Circle } from "@/base/model/circle";
import { Counter } from "@/base/model/counter";
import { Limit } from "@/content/common/constants/limits";
import { Selector } from "@/content/common/constants/selectors";
import { Style } from "@/content/common/constants/styles";
import { BaseListener } from "./base.listener";

export class TweetdeckListener extends BaseListener {

  protected checkObserver: boolean = false;

  public draw(element: HTMLElement): void {

    let counter = new Counter(element.getElementsByClassName(Selector.COUNTER)[ 0 ]);

    if (counter.notEmpty() && this.controlElements.notEmpty()) {
      return;
    }

    const textarea = element.getElementsByTagName(Selector.TEXTAREA)[ 0 ] as any;

    const sourceCounter = new Counter(element.getElementsByClassName(Selector.SOURCE_COUNTER)[ 0 ]);

    const circle = new Circle(element.getElementsByClassName(Selector.CIRCLE)[ 0 ]);

    // get or create a new element to display our awesome counter
    if (!counter.notEmpty()) {

      counter = new Counter(sourceCounter.clone());
      counter.addStyle(Selector.COUNTER);
      counter.clear(Selector.SOURCE_COUNTER, Style.T_HIDE, Style.T_RED);

      sourceCounter.hide();
      sourceCounter.get().parentElement.appendChild(counter.get());
    }

    this.controlElements.add(counter, circle);

    const length = (textarea.textLength === 0) ? (Limit.LONG - sourceCounter.length()) : textarea.textLength;

    this.setLengthAndStyles(length);

    // clear observer, jus in case
    this.clearObserver();

    // set observer to listen the changes of counter text.
    this.observer = new MutationObserver(() => {

      this.setLengthAndStyles(textarea.textLength);

    });

    this.observer.observe(sourceCounter.get(), { childList: true, subtree: true });

  }

}

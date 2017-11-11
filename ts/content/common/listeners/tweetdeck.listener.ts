import { Limit } from "@/content/common/constants/limits";
import { Selector } from "@/content/common/constants/selectors";
import { Style } from "@/content/common/constants/styles";
import { BaseListener } from "./base.listener";

export class TweetdeckListener extends BaseListener {

  protected checkObserver: boolean = false;

  public draw(element: HTMLElement): void {

    const counter = element.getElementsByClassName(Selector.COUNTER);

    if (counter.length > 0 && this.counter) {
      return;
    }

    const textarea = element.getElementsByTagName(Selector.TEXTAREA)[ 0 ] as any;

    const sourceCounter = element.getElementsByClassName(Selector.SOURCE_COUNTER)[ 0 ] as HTMLElement;

    this.circle = element.getElementsByClassName(Selector.CIRCLE)[ 0 ] as HTMLElement;

    // get or create a new element to display our awesome counter
    this.counter = element.getElementsByClassName(Selector.COUNTER)[ 0 ] as HTMLElement;

    if (!this.counter) {
      this.counter = sourceCounter.cloneNode(true) as HTMLSpanElement;
      this.counter.classList.add(Selector.COUNTER);
      this.counter.classList.remove(Selector.SOURCE_COUNTER, Style.T_HIDE, Style.T_RED);

      sourceCounter.classList.add(Style.HIDE);
      sourceCounter.parentElement.appendChild(this.counter);
    }

    const length = (textarea.textLength === 0) ? (Limit.LONG - ~~sourceCounter.textContent) : textarea.textLength;

    this.setLengthAndStyles(length);

    // clear observer, jus in case
    this.clearObserver();

    // set observer to listen the changes of counter text.
    this.observer = new MutationObserver(() => {

      this.setLengthAndStyles(textarea.textLength);

    });

    this.observer.observe(sourceCounter, { childList: true, subtree: true });

  }

}

import { Selector } from "@/content/common/constants/selectors";
import { Style } from "@/content/common/constants/styles";
import { BaseListener } from "./base.listener";

export class WebListener extends BaseListener {

  public draw(element: any): void {

    let initialContentLength = 0;

    // get a circle indicator
    this.circle = element.getElementsByClassName(Selector.CIRCLE)[ 0 ] as HTMLElement;

    // source box
    const sourceCounter = element.getElementsByClassName(Selector.COUNTDOWN_COUNTER)[ 0 ] as any;

    // get a tweet box to understand if there was a saved text or not,
    // and to catch changes.
    const tweetBox = element.querySelector(Selector.BOX_EDITOR);

    // to observe text length
    const textarea = element.getElementsByTagName(Selector.TEXTAREA)[ 0 ];

    this.counter = sourceCounter.cloneNode(false);
    this.counter.classList.remove(Style.T_REACHED);

    initialContentLength = (textarea.textLength === 0) ? tweetBox.textContent.length : textarea.textLength;

    // insert our counter before the source counter, and remove the last.
    sourceCounter.parentElement.insertBefore(this.counter, sourceCounter);
    sourceCounter.remove();

    // set initial length
    this.setLengthAndStyles(initialContentLength);

    // set observer to listen the changes of text.
    this.observer = new MutationObserver(() => {

      this.setLengthAndStyles(textarea.textLength);

    });

    this.observer.observe(tweetBox, { attributes: true, childList: true, subtree: true });

  }

}

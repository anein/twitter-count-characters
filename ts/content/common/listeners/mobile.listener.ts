import { Selector } from "@/content/common/constants/selectors";
import { Style } from "@/content/common/constants/styles";
import { BaseListener } from "./base.listener";

export class MobileListener extends BaseListener {

  public circle: any;

  public draw(element: any) {

    // get progress bar as a basic element
    const progressbar = document.querySelectorAll(Selector.PROGRESSBAR)[ 1 ];

    const parent = progressbar.parentElement;

    const circles = progressbar.getElementsByTagName("circle");

    // to catch changes
    this.circle = circles[ 1 ];

    // get color for text
    const color = circles[ 0 ].getAttribute("stroke");

    // get or create a default counter.

    this.counter = document.getElementById(Selector.COUNTER);

    if (!this.counter) {
      this.counter = document.createElement("div");
      this.counter.id = Selector.COUNTER;
      this.counter.style.color = color;
    }

    parent.insertBefore(this.counter, progressbar);

    this.setLengthAndStyles(element.textLength);

    // set observer to listen the changes of textarea.
    this.observer = new MutationObserver(() => {

      const length = element.textLength;

      // prevent creating a twitter counter. Damned ReactJS. ^_^
      if (length >= 260) {

        const item = Array.from(parent.children).filter((e: any) => !!e.dir);

        if (item.length > 0) {
          item[ 0 ].remove();
        }

      }

      this.setLengthAndStyles(length);

    });

    this.observer.observe(element, { childList: true });

  }

}

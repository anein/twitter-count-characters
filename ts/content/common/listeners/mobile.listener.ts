import { Composite } from "@/base/composite";
import { Circle } from "@/base/model/circle";
import { Counter } from "@/base/model/counter";
import { Selector } from "@/content/common/constants/selectors";
import { Style } from "@/content/common/constants/styles";
import { BaseListener } from "./base.listener";

export class MobileListener extends BaseListener {

  public draw(element: any) {

    // get progress bar as a basic element
    const progressbar = document.querySelectorAll(Selector.PROGRESSBAR)[ 1 ];

    const parent = progressbar.parentElement;

    const circles = progressbar.getElementsByTagName("circle");

    // get color for text
    const color = circles[ 0 ].getAttribute("stroke");

    const circle = new Circle(circles[ 1 ]);

    // get or create a default counter.
    const counter = new Counter(document.getElementById(Selector.COUNTER));

    if (!counter.notEmpty()) {
      counter.create(Selector.COUNTER, color);
    }

    parent.insertBefore(counter.get(), progressbar);

    this.controlElements.add(circle, counter);

    this.setLengthAndStyles(element.textLength);

    // set observer to listen the changes of textarea
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

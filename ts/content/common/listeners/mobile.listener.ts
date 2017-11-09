import { BaseListener } from "./base.listener";

export class MobileListener extends BaseListener {

  public draw(element: any) {

    // get progress bar as a basic element
    const progressbar = document.querySelectorAll("[role='progressbar']")[ 1 ];

    // to catch changes
    const circle = progressbar.querySelectorAll("circle")[ 1 ];

    // get color for text
    const color = progressbar.querySelectorAll("circle")[ 0 ].getAttribute("stroke");

    // create default counter with initial length.
    const counter = document.createElement("div");
    counter.classList.add("visible-counter");
    counter.style.color = color;
    counter.innerText = this.calculateLength(element.textLength);

    progressbar.parentElement.insertBefore(counter, progressbar);

    // set observer to listen the changes of textarea.
    this.observer = new MutationObserver((mutations) => {

      const characterLength = this.calculateLength(element.textLength);

      if (parseInt(characterLength, 10) <= 20) {
        counter.style.display = "none";
      } else {
        counter.style.display = "inline";
        counter.innerText = characterLength.toString();
      }

    });

    this.observer.observe(circle, { attributes: true });

  }

}

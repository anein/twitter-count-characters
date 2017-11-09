import { BaseListener } from "./base.listener";

export class TweetdeckListener extends BaseListener {

  protected checkObserver: boolean = false;

  public draw(element: HTMLElement): void {

    if (element.querySelector(".visible-counter")) {
      return;
    }

    const circle = element.querySelector(".js-progress-circle");

    const textarea = element.querySelector("textarea");

    const sourceCounter = element.querySelector(".js-character-count");

    // create a new element to display counter
    const duplicate = sourceCounter.cloneNode(true) as HTMLSpanElement;
    duplicate.classList.add("visible-counter");
    duplicate.classList.remove("is-hidden", "js-character-count");
    //
    sourceCounter.parentElement.appendChild(duplicate);

    // set observer to listen the changes of counter text.
    this.observer = new MutationObserver((mutations) => {

      if (parseInt(sourceCounter.textContent, 10) <= 20) {
        duplicate.classList.add("is-hidden");
      } else {
        duplicate.classList.remove("is-hidden");
      }

      duplicate.textContent = sourceCounter.textContent;

    });

    this.observer.observe(circle, { attributes: true });

  }

}

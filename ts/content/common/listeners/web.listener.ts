import { BaseListener } from "./base.listener";

export class WebListener extends BaseListener {

  // public initialContentLength: number = 0;

  public draw(element: any): void {

    let initialContentLength = 0;

    // to catch changes
    const circle = element.querySelector(".js-progress-circle");
    // counter box
    const counter = element.querySelector(".tweet-counter");
    // get a tweet box to understand if there was a saved text or not.
    const tweetBox = element.querySelector(".tweet-box.rich-editor");
    //
    const textarea = element.querySelector("textarea");

    if (tweetBox) {
      initialContentLength = tweetBox.textContent.length;
    }

    // set initial length
    counter.innerText = this.calculateLength(initialContentLength);

    // set observer to listen the changes of text.
    // TODO: optimise.
    this.observer = new MutationObserver((mutations) => {
      let textLength = textarea.textLength;

      if (textLength === 0 && tweetBox) {
        textLength = tweetBox.textContent.length;
      }

      const characterLength = this.calculateLength(textLength);

      if (parseInt(characterLength, 10) > 20) {
        counter.innerText = characterLength;
      }

    });

    this.observer.observe(circle, { attributes: true });

  }

}

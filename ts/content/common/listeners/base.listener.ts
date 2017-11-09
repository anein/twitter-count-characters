import { IListener } from "@/content/common/interface/listener.interface";

export class BaseListener implements IListener {

  // Default timeout for interval
  public timeout: number = 500;

  public maxTweetLength: number = 280;

  // attached observer
  protected observer: MutationObserver = null;

  //
  protected checkObserver: boolean = true;

  // timer id
  private __timer: number;

  // DOM query expression, e.g. `.my-class`
  private __query: string;

  public get timer(): number {
    return this.__timer;
  }

  public set timer(value: number) {
    this.__timer = value;
  }

  public get query(): string {
    return this.__query;
  }

  public set query(value: string) {
    this.__query = value;
  }

  public get element(): HTMLElement | null {
    return (document.querySelector(this.query) as HTMLElement) || null;
  }

  public listen(): void {

    this.clearTimer();

    this.__timer = setInterval(() => {

      if (this.element && (!this.observer || !this.checkObserver)) {
        // console.log("active counter");
        this.draw(this.element);

      } else if (this.element === null && this.observer) {
        // console.log("disconnect and remove the observer");
        this.observer.disconnect();
        this.observer = null;
      } else {
        // o_O, or for some other purposes
      }

    }, this.timeout);

  }

  public draw(element: HTMLElement): void {
    //
  }

  public clearTimer(): void {
    if (this.__timer) {
      clearInterval(this.__timer);
    }
  }

  /**
   * Calculates remaining text length
   *
   * @param {number} length - current text length
   * @returns {string}
   */
  public calculateLength(length: number): string {
    return (this.maxTweetLength - length).toString();
  }

}

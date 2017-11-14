import { IElement } from "@/base/model/interface/element";
import { Selector } from "@/content/common/constants/selectors";
import { Style } from "@/content/common/constants/styles";

export class Element implements IElement {

  constructor(public element: HTMLElement | any) {

  }

  /**
   * Checks if the element exists in DOM
   */
  public notEmpty(): boolean {
    return !!this.element;
  }

  public get(): HTMLElement | any {
    return this.element;
  }

  public show(): void {
    this.element.classList.remove(Style.HIDE);
  }

  public hide(): void {
    this.element.classList.add(Style.HIDE);
  }

  public warn(): void {
    this.element.classList.add(Style.WARN);
  }

  public danger(): void {
    this.element.classList.add(Style.DANGER);
  }

  public clear(...additilaClasses: string[]): void {
    console.log(this.element);
    this.element.classList.remove(Style.WARN, Style.DANGER, ...additilaClasses);
  }

  public pulse(): void {
    //
  }

  public setText(value: string): void {
    //
  }

}

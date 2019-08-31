import { IElement } from '@/base/model/interface/element';
import { Selector } from '@/content/common/constants/selectors';
import { Style } from '@/content/common/constants/styles';

export class Element implements IElement {
  constructor(public element: HTMLElement | any) {
    if (this.element) {
      this.show();
    }
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
    this.element.style.display = 'inline';
  }

  public hide(): void {
    this.element.style.display = 'none !important';
    this.element.classList.add(Style.HIDE);
  }

  public warn(): void {
    this.element.classList.add(Style.WARN);
  }

  public danger(): void {
    this.element.classList.add(Style.DANGER);
  }

  public clear(...additionalClasses: string[]): void {
    this.element.classList.remove(Style.WARN, Style.DANGER, ...additionalClasses);
  }

  public pulse(): void {
    //
  }

  public setText(value: string): void {
    //
  }

  public disable(): void {
    //
  }

  public enable(): void {
    //
  }
}

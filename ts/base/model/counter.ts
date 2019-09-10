import { Element } from '@/base/model/element';
import { Style } from '@/content/common/constants/styles';

export class Counter extends Element {
  public constructor(public element: HTMLElement | any = null) {
    super(element);

    if (!this.element) {
      this.element = document.createElement('div');
      this.element.classList.add(Style.COUNTER);
      this.element.style.color = 'rgb(101, 119, 134)';
    }
  }

  public addStyle(...styles: string[]): void {
    this.element.classList.add(...styles);
  }

  /**
   * Returns length of the `textContent` attribute
   */
  public length(): number {
    return ~~this.element.textContent;
  }

  public setText(value: any) {
    this.element.innerText = value;
  }
}

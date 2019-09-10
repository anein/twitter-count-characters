import { Element } from '@/base/model/element';
import { Style } from '@/content/common/constants/styles';

export class Counter extends Element {
  private __initialValue: number;
  private __value: string;

  public set initValue(value: number) {
    this.__initialValue = value;
    this.element.innerText = value;
  }

  public constructor(public element: HTMLElement | any = null) {
    super(element);

    if (!this.element) {
      this.element = document.createElement('div');
      this.element.classList.add(Style.COUNTER);

      this.empty();
    }
  }

  public addStyle(...styles: string[]): void {
    this.element.classList.add(...styles);
  }

  public clear(...additionalClasses): void {
    super.clear(...additionalClasses);

    if (this.__initialValue === parseInt(this.__value, 10)) {
      this.empty();
    } else {
      this.touched();
    }
  }

  /**
   * Returns length of the `textContent` attribute
   */
  public length(): number {
    return ~~this.element.textContent;
  }

  public setText(value: any) {
    this.element.innerText = value;
    this.__value = value;
  }

  public touched() {
    this.element.style.color = 'rgb(101, 119, 134)';
  }

  public empty() {
    this.element.style.color = 'rgb(204, 214, 221)';
  }
}

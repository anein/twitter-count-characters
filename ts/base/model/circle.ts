import { Element } from '@/base/model/element';
import { IElement } from '@/base/model/interface/element';
import { Selector } from '@/content/common/constants/selectors';
import { Style } from '@/content/common/constants/styles';

export class Circle extends Element {
  // store a circle element that is filled by color
  protected progressbar: any;

  public constructor(element: HTMLElement | any) {
    super(element);

    if (this.element) {
      this.element.classList.add('padding-xs');
      this.progressbar = this.element.querySelectorAll('circle')[1];
    }
  }

  public show(): void {
    if (this.element.parentElement.classList.contains(Style.HIDE)) {
      this.element.parentElement.classList.remove(Style.HIDE);
    } else {
      this.element.parentElement.parentElement.classList.remove(Style.HIDE);
    }
  }

  public hide(level: number = 0): void {
    switch (level) {
      case 0:
        this.element.classList.add(Style.HIDE);
        break;
      case 1:
        this.element.parentElement.classList.add(Style.HIDE);
        break;
      case 2:
        this.element.parentElement.parentElement.classList.add(Style.HIDE);
        break;
      default:
        this.element.classList.add(Style.HIDE);
    }
  }

  public clear(): void {
    this.progressbar.classList.remove(Style.WARN, Style.DANGER, Style.T_PULSE, Style.T_A_PULSE);
  }

  public pulse(): void {
    this.progressbar.classList.add(Style.T_PULSE, Style.T_A_PULSE);
  }

  public warn(): void {
    this.progressbar.classList.add(Style.WARN);
  }

  public danger(): void {
    this.progressbar.classList.add(Style.DANGER);
  }

  /**
   * Gets styles of the progressbar.
   */
  public getStyle() {
    return this.progressbar.style;
  }

  /**
   *
   */
  public setStyle(value: any) {
    this.progressbar.style.strokeDashoffset = value.strokeDashoffset;
    this.progressbar.style.strokeDasharray = value.strokeDasharray;
  }
}

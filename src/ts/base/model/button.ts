import { Element } from '@/base/model/element';
import { Style } from '@content/common/constants/styles';

export class Button extends Element {
  public disable(): void {
    this.element.classList.add(Style.DISABLE);
    this.element.setAttribute('disabled', 'true');
  }

  public enable(): void {
    this.element.classList.remove(Style.DISABLE);
    this.element.removeAttribute('disabled');
  }

  public warn(): void {
    //
  }

  public danger(): void {
    //
  }
}

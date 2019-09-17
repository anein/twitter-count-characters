import { Element } from '@/base/model/element';

export class Button extends Element {
  public disable(): void {
    this.element.classList.add('is-disabled');
    this.element.setAttribute('disabled', 'true');
  }

  public enable(): void {
    this.element.classList.remove('is-disabled');
    this.element.setAttribute('disabled', 'false');
    this.element.removeAttribute('disabled');
  }

  public warn(): void {}

  public danger(): void {}
}

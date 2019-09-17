import { IElement } from '@base/model/interface/element';

export class Composite implements IElement {
  private children: IElement[] = [];

  public notEmpty(): boolean {
    return this.children.length > 0;
  }

  /**
   * Adds an element to composition
   *
   * @param {IElement} elements - component
   */
  public add(...elements: IElement[]): void {
    this.children.push(...elements);
  }

  /**
   *
   * Removes an element from composition
   *
   */
  public remove(): void {
    for (const element of this.children) {
      element.remove();
    }
  }

  /**
   * Calls the `show` method of children
   */
  public show(): void {
    for (const element of this.children) {
      element.show();
    }
  }

  /**
   * Calls the `hide` method of children
   */
  public hide(): void {
    for (const element of this.children) {
      element.hide();
    }
  }

  /**
   * Calls the `warn` method of children
   */
  public warn(): void {
    this.clear();
    for (const element of this.children) {
      element.warn();
    }
  }

  /**
   * Calls the `pulse` method of children
   */
  public pulse(): void {
    for (const element of this.children) {
      element.pulse();
    }
  }

  /**
   * Calls the `danger` method of children
   */
  public danger(): void {
    this.clear();
    for (const element of this.children) {
      element.danger();
    }
  }

  public disable(): void {
    for (const element of this.children) {
      element.disable();
    }
  }

  public enable(): void {
    for (const element of this.children) {
      element.enable();
    }
  }

  /**
   * Calls the `clear` method of children
   */
  public clear(): void {
    for (const element of this.children) {
      element.clear();
    }
  }

  public setText(value: any): void {
    for (const element of this.children) {
      element.setText(value);
    }
  }
}

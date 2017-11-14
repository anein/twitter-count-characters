import { Element } from "@/base/model/element";

export class Counter extends Element {

  /**
   * Creates a counter element
   *
   * @param {string} id - unique element id
   * @param {string} [color=""] - element color
   */
  public create(id: string, color: string = ""): void {
    this.element = document.createElement("div");
    this.element.id = id;
    this.element.style.color = color;
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

  /**
   * Clone element
   */
  public clone(): Node {
    return this.element.cloneNode(true);
  }

  public setText(value: string) {
    this.element.innerText = value;
  }

}

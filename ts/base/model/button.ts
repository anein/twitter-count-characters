import { Element } from "@/base/model/element";
import { Selector } from "@/content/common/constants/selectors";
import { Style } from "@/content/common/constants/styles";

export class Button extends Element {

  private clonedElement = undefined;

  public disable(): void {
    if (!this.clonedElement) {
      this.clonedElement = this.element.cloneNode(true);
      this.clonedElement.classList.add(Style.DISABLE, Selector.BUTTON_CLONE);
      this.clonedElement.disabled = true;
      this.element.parentElement.insertBefore(this.clonedElement, this.element.nextSibling);
      this.hide();
    }

  }

  public enable(): void {

    this.removeClone();
    this.show();

  }

  public warn(): void {
    //
  }

  public danger(): void {
    //
  }

  private removeClone(): void {
    if (this.clonedElement) {
      this.clonedElement.remove();
      this.clonedElement = undefined;
    }

  }

}

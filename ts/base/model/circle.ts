import { Element } from "@/base/model/element";
import { IElement } from "@/base/model/interface/element";
import { Selector } from "@/content/common/constants/selectors";
import { Style } from "@/content/common/constants/styles";

export class Circle extends Element {

  public show(): void {
    if (this.element.parentElement.classList.contains(Style.HIDE)) {
      this.element.parentElement.classList.remove(Style.HIDE);
    } else {
      this.element.parentElement.parentElement.classList.remove(Style.HIDE);
    }

  }

  public hide(level: number = 2): void {
    if (level === 2) {
      this.element.parentElement.parentElement.classList.add(Style.HIDE);
    } else {
      this.element.parentElement.classList.add(Style.HIDE);
    }

  }

  public clear(): void {
    this.element.classList.remove(Style.WARN, Style.DANGER, Style.T_PULSE, Style.T_A_PULSE);
  }

  public pulse(): void {
    this.element.classList.add(Style.T_PULSE, Style.T_A_PULSE);
  }

}

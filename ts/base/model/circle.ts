import { Element } from "@/base/model/element";
import { IElement } from "@/base/model/interface/element";
import { Selector } from "@/content/common/constants/selectors";
import { Style } from "@/content/common/constants/styles";

export class Circle extends Element {

  public clear(): void {
    this.element.classList.remove(Style.WARN, Style.DANGER, Style.T_PULSE, Style.T_A_PULSE);
  }

  public pulse(): void {
    this.element.classList.add(Style.T_PULSE, Style.T_A_PULSE);
  }

}

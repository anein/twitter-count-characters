import { IConfig } from '@base/interface/config';
import { IOptions } from '@base/interface/options';
import { Limit } from '@content/common/constants/limits';

export class Options implements IOptions {
  public maxLength: number;

  public warnLength: number;

  public hideCircle: boolean;

  public constructor(options: IConfig) {
    this.maxLength = Limit.LONG;
    this.warnLength = options.limit ? Limit.SHORT : Limit.TINY;
    this.hideCircle = options.circle;
  }
}

import { IConfig } from '@/base/interface/config';
import { Sender } from '@/base/senders';

export interface IMessage {
  from: Sender;

  data: IConfig;
}

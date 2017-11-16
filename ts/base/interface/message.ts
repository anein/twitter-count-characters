import { IOptions } from "@/base/interface/options";
import { Sender } from "@/base/senders";

export interface IMessage {

  from: Sender;

  data: IOptions;

}

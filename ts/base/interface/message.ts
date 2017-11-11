import { Sender } from "@/base/senders";

export interface IMessage {

  from: Sender;

  data: any;

}

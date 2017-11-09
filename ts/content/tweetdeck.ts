import { ListenerFactory } from "@/content/common/factory";
import { ListenerKind } from "@/content/common/kinds";

(() => {

  const creator = new ListenerFactory();

  // compose block
  creator.add(".compose .compose-text-container", ListenerKind.Tweetdeck);
  // reply block
  creator.add(".inline-reply .compose-text-container", ListenerKind.Tweetdeck);

  creator.listen();

})();

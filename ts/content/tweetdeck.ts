import { IOptions } from "@/base/interface/options";
import { ListenerFactory } from "@/content/common/factory";
import { ListenerKind } from "@/content/common/kinds";

(() => {

  /**
   * Get saved options and run our factory.
   */
  chrome.storage.sync.get((items: IOptions) => {

    const { limit = false, mode = true, circle = false } = { ...items };

    const creator = new ListenerFactory();
    creator.options = { limit, mode, circle };

    creator.add(".compose .compose-text-container", ListenerKind.Tweetdeck);
    // reply block
    creator.add(".inline-reply .compose-text-container", ListenerKind.Tweetdeck);

    creator.listen();

  });

})();

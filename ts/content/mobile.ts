import { ListenerFactory } from "@/content/common/factory";
import { ListenerKind } from "@/content/common/kinds";

(() => {

  /**
   * Get saved options and run our factory.
   */
  chrome.storage.sync.get((items) => {

    const { limit = false } = { ...items };

    const creator = new ListenerFactory();
    creator.notifyLimitation = limit;

    creator.add("[data-testid='tweet-textarea']", ListenerKind.Mobile);

    creator.listen();

  });

})();

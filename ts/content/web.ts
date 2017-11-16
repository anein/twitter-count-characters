import { IMessage } from "@/base/interface/message";
import { IOptions } from "@/base/interface/options";
import { Sender } from "@/base/senders";
import { ListenerFactory } from "./common/factory";
import { ListenerKind } from "./common/kinds";

(() => {

  /**
   * Get saved options and run our factory.
   */
  chrome.storage.sync.get((items: IOptions) => {

    const { limit = false, mode = true, circle = false } = { ...items };

    const creator = new ListenerFactory();
    creator.options = { limit, mode, circle };

    // top box
    creator.add(".timeline-tweet-box form.tweet-form:not(.condensed)", ListenerKind.Web);
    // replies
    creator.add("form.tweet-form.is-reply", ListenerKind.Web);
    // modal dialog
    creator.add("#global-tweet-dialog-dialog", ListenerKind.Web);

    creator.listen();

  });

})();

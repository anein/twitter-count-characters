import { ListenerFactory } from "./common/factory";
import { ListenerKind } from "./common/kinds";

(() => {

  const creator = new ListenerFactory();
  // top box
  creator.add(".timeline-tweet-box form.tweet-form:not(.condensed)", ListenerKind.Web);
  // replies
  creator.add("form.tweet-form.is-reply", ListenerKind.Web);
  // modal dialog
  creator.add("#global-tweet-dialog-dialog", ListenerKind.Web);

  creator.listen();

})();

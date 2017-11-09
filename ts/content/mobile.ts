import {ListenerFactory} from "@/content/common/factory";
import {ListenerKind} from "@/content/common/kinds";

(() => {

  const creator = new ListenerFactory();

  creator.add("[data-testid='tweet-textarea']", ListenerKind.Mobile);

  creator.listen();

})();

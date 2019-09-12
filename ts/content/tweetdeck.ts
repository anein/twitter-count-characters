import { ListenerFactory } from '@/content/common/factory';
import { ListenerKind } from '@/content/common/constants/kinds';
import { IConfig } from '@/base/interface/config';

(() => {
  /**
   * Get saved options and run our factory.
   */
  chrome.storage.sync.get((items: IConfig) => {
    const { limit = false, mode = true, circle = false } = { ...items };

    const creator = new ListenerFactory();
    creator.options = { limit, mode, circle };

    creator.add(ListenerKind.Tweetdeck, '.compose .compose-text-container');
    // reply block
    creator.add(ListenerKind.Tweetdeck, '.inline-reply .compose-text-container');

    creator.listen();
  });
})();

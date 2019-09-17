import { ListenerFactory } from '@/content/common/factory';
import { ListenerKind } from '@/content/common/constants/kinds';
import { IConfig } from '@/base/interface/config';
import { IMessage } from '@/base/interface/message';
import { Sender } from '@/base/senders';

(() => {
  let creator: ListenerFactory;
  /**
   * Get saved options and run our factory.
   */
  chrome.storage.sync.get((items: IConfig) => {
    const { limit = false, mode = true, circle = false } = { ...items };

    creator = new ListenerFactory();
    creator.config = { limit, mode, circle };
    creator.add(ListenerKind.Tweetdeck, '.compose .compose-text-container div:nth-child(2n)');
    // reply block
    creator.add(ListenerKind.Tweetdeck, '.inline-reply .compose-text-container div:nth-child(4)');

    creator.listen();
  });

  /**
   * Listens the message from the POPUP panel.
   */
  chrome.runtime.onMessage.addListener((message: IMessage) => {
    if (message.from === Sender.POPUP) {
      creator.config = message.data;
      creator.updateOptions();
    }
  });
})();

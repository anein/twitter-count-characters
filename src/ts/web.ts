import { IConfig } from '@base/interface/config';
import { IMessage } from '@base/interface/message';
import { Sender } from '@base/senders';
import { WEB_Selector } from '@content/constants/selectors';

(() => {
  /**
   * Get saved options and run our factory.
   */
  chrome.storage.sync.get((items: IConfig) => {
    const body = document.getElementsByTagName('body')[0];

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `chrome-extension://${chrome.runtime.id}/js/scripts/web.js`;

    script.setAttribute('name', WEB_Selector.SCRIPT_NAME);
    script.setAttribute('data', JSON.stringify({ ...items }));

    body.appendChild(script);
  });

  /**
   * Listens the message from the POPUP panel.
   */
  chrome.runtime.onMessage.addListener((message: IMessage) => {
    if (message.from === Sender.POPUP) {
      const element = document.querySelector(`script[name='${WEB_Selector.SCRIPT_NAME}']`);
      element.setAttribute('data', JSON.stringify({ ...message.data }));
    }
  });
})();

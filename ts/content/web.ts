import { IConfig } from '@/base/interface/config';

(() => {
  /**
   * Get saved options and run our factory.
   */
  chrome.storage.sync.get((items: IConfig) => {
    const { limit = false, mode = true, circle = false } = { ...items };

    const body = document.getElementsByTagName('body')[0];

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'chrome-extension://dnpjeaffpppppmimaeebkglkejbjgfig/js/scripts/web.js';

    script.setAttribute('name', 'zen-web-injection');
    script.setAttribute('data', JSON.stringify({ ...items }));

    body.appendChild(script);
  });
})();

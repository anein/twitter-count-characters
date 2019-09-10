// function findReactElement(dom) {
//   let key = Object.keys(dom).find(key => key.startsWith('__reactInternalInstance$'));
//   let internalInstance = dom[key];
//
//   console.dir(key);
//
//   if (internalInstance == null) return null;
//
//   if (internalInstance.return) {
//     // react 16+
//     return internalInstance._debugOwner ? internalInstance._debugOwner.stateNode : internalInstance.return.stateNode;
//   } else {
//     // react <16
//     return internalInstance._currentElement._owner._instance;
//   }
// }

import { IOptions } from '@/base/interface/options';
import { ListenerFactory } from '@/content/common/factory';
import { ListenerKind } from '@/content/common/kinds';

(() => {
  /**
   * Get saved options and run our factory.
   */
  chrome.storage.sync.get((items: IOptions) => {
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

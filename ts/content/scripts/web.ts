import { IOptions } from '@/base/interface/options';
import { ListenerFactory } from '@/content/common/factory';
import { ListenerKind } from '@/content/common/kinds';
import elements = chrome.devtools.panels.elements;

(() => {
  const mutation = new MutationObserver(e => {
    const root = document.querySelector('#react-root div[data-reactroot]');

    // get the progressbar of the toolbar
    const progressbar = root.querySelectorAll(`div[data-testid='toolBar'] div[role='progressbar']`).item(0);

    // disconnect mutation when progressbar is found.
    if (progressbar) {
      console.info('Initial observer is disconnected');
      mutation.disconnect();

      const toolbar = progressbar.parentNode.parentNode;

      const creator = new ListenerFactory();
      creator.options = { limit: false, mode: false, circle: true };

      creator.add(ListenerKind.Web, toolbar);
      creator.listen();
    }
  });

  mutation.observe(document.querySelector('#react-root'), { attributes: true, childList: true, subtree: true });
})();

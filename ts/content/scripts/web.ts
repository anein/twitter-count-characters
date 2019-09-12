import { ListenerFactory } from '@/content/common/factory';
import { ListenerKind } from '@/content/common/constants/kinds';
import { Selector, WEB_Selector } from '@/content/common/constants/selectors';

(() => {
  function getSourceScriptData() {
    const script = document.querySelector("script[name='zen-web-injection']");
    const data = script ? script.getAttribute('data') : '{}';

    return { ...JSON.parse(data) };
  }

  const config = getSourceScriptData();

  const mutation = new MutationObserver(e => {
    const root = document.querySelector('#react-root div[data-reactroot]');

    // get the right div of the toolbar
    const progressbar = root.querySelectorAll(WEB_Selector.TOOLBAR_RIGHT_PANEL).item(0);

    // disconnect mutation when progressbar is found.
    if (progressbar) {
      mutation.disconnect();

      const creator = new ListenerFactory();
      creator.options = config;
      // selector: column + toolbar
      creator.add(ListenerKind.Web, `${WEB_Selector.COLUMN} ${WEB_Selector.TOOLBAR_RIGHT_PANEL}`);
      // selector: modal + toolbar
      creator.add(ListenerKind.Web, `${WEB_Selector.MODAL} ${WEB_Selector.TOOLBAR_RIGHT_PANEL}`);
      creator.listen();
    }
  });

  mutation.observe(document.querySelector('#react-root'), { attributes: true, childList: true, subtree: true });
})();

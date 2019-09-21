import { ListenerKind } from '@content/common/constants/kinds';
import { WEB_Selector } from '@content/common/constants/selectors';
import { ListenerFactory } from '@content/common/factory';

(() => {
  let creator: ListenerFactory;

  const script = document.querySelector(`script[name='${WEB_Selector.SCRIPT_NAME}']`);

  const config = getScriptData();

  /**
   * Gets value of the data attribute of the script.
   */
  function getScriptData() {
    const data = script ? script.getAttribute('data') : '{}';

    return { ...JSON.parse(data) };
  }

  /**
   * Observes changes of the react root to catch creation of the react app.
   */
  function observeRootMutation() {
    const mutation = new MutationObserver(e => {
      const root = document.querySelector(WEB_Selector.ROOT_REACT);

      // get the right div of the toolbar
      const progressbar = root.querySelectorAll(WEB_Selector.TOOLBAR_RIGHT_PANEL).item(0);

      // disconnect mutation when progressbar is found.
      if (progressbar) {
        mutation.disconnect();

        creator = new ListenerFactory();
        creator.config = config;
        // selector: column + toolbar
        creator.add(ListenerKind.Web, `${WEB_Selector.COLUMN} ${WEB_Selector.TOOLBAR_RIGHT_PANEL}`);
        // selector: modal + toolbar
        creator.add(ListenerKind.Web, `${WEB_Selector.MODAL} ${WEB_Selector.TOOLBAR_RIGHT_PANEL}`);
        creator.listen();
      }
    });

    mutation.observe(document.querySelector(WEB_Selector.ROOT), { attributes: true, childList: true, subtree: true });
  }

  function createScriptMutation() {
    const scriptMutation = new MutationObserver(e => {
      creator.config = getScriptData();
      creator.updateOptions();
    });

    scriptMutation.observe(script, { attributes: true });
  }

  // INIT
  observeRootMutation();
  createScriptMutation();
})();

import { Sender } from '@/base/senders';

(() => {
  // get basic elements
  const limitElement = document.getElementById('tweet.limit') as HTMLInputElement;
  const circleElement = document.getElementById('tweet.circles') as HTMLInputElement;

  // get the initial state for the elements.
  chrome.storage.sync.get(items => {
    const { limit = false, circle = false } = { ...items };

    limitElement.checked = limit;
    circleElement.checked = circle;

    addOptionalListeners();
  });

  /**
   * Sets listeners to the `hide circles` checkbox and `140 warning` checkbox
   */
  function addOptionalListeners(): void {
    const elements = [limitElement, circleElement];

    for (const element of elements) {
      element.addEventListener('change', (evt: any) => {
        sendMessage();
      });
    }
  }

  /**
   * Stores options and sends them to the context script
   */
  function sendMessage(): void {
    const limit = limitElement.checked;
    const circle = circleElement.checked;

    // store our settings;
    chrome.storage.sync.set({ limit, circle }, () => {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, { from: Sender.POPUP, data: { limit, circle } });
      });
    });
  }

  /**
   * Gets all nodes with the `data-i18n` attribute, iterates through them and puts a found message
   * in the locale to the inner HTML of a node.
   */
  function i18n(): void {
    const elements = document.querySelectorAll('[data-i18n]');

    Array.from(elements).forEach((node: Element) => {
      const name = node.getAttribute('data-i18n') || '';
      const message = chrome.i18n.getMessage(name);

      node.textContent = message ? message : name;
    });
  }

  /**
   * Call additional functions.
   */
  i18n();
})();

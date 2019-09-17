import { Sender } from "@/base/senders";

(() => {

  // get basic elements
  const limitElement = document.getElementById("tweet.limit") as HTMLInputElement;
  const circleElement = document.getElementById("tweet.circles") as HTMLInputElement;
  const modeElement = document.getElementById("tweet.mode") as HTMLInputElement;

  // get the initial state for the elements.
  chrome.storage.sync.get((items) => {

    const { limit = false, circle = false, mode = true } = { ...items };

    limitElement.checked = limit;
    circleElement.checked = circle;
    modeElement.checked = mode;

    disableNoneMode(mode);

    modeElement.addEventListener("change", (evt: any) => {

      disableNoneMode(!!evt.target.checked);
      sendMessage();

    });

    addOptionalListeners();

  });

  /**
   * Disables or enables the `old school` mode.
   *
   * @param {boolean} on - enable or disable the additional options.
   */
  function disableNoneMode(on: boolean): void {

    const grid = document.getElementsByClassName("non-mode")[ 0 ] as HTMLInputElement;

    if (on) {
      grid.classList.add("disabled");
    } else {
      grid.classList.remove("disabled");
    }

    limitElement.disabled = on;
    circleElement.disabled = on;

  }

  /**
   * Stores options and sends them to the context script
   */
  function sendMessage(): void {

    const limit = limitElement.checked;
    const circle = circleElement.checked;
    const mode = modeElement.checked;

    // store our settings;
    chrome.storage.sync.set({ limit, circle, mode }, () => {

      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {

        chrome.tabs.sendMessage(tabs[ 0 ].id, { from: Sender.POPUP, data: { limit, circle, mode } });

      });

    });
  }

  /**
   * Sets listeners to the `hide circles` checkbox and `140 warning` checkbox
   */
  function addOptionalListeners(): void {

    const elements = [ limitElement, circleElement ];

    for (const element of elements) {

      element.addEventListener("change", (evt: any) => {

        if (!modeElement.checked) {
          sendMessage();
        }

      });
    }

  }

})();

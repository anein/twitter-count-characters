import { IMessage } from "@/base/interface/message";
import { Sender } from "@/base/senders";

(() => {

  const limitElement = document.getElementById("tweet.limit") as HTMLInputElement;
  const circleElement = document.getElementById("tweet.circles") as HTMLInputElement;
  const modeElement = document.getElementById("tweet.mode") as HTMLInputElement;

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

  function sendMessage(): void {

    const limit = limitElement.checked;
    const circle = circleElement.checked;
    const mode = modeElement.checked;

    const data = { limit, circle, mode };

    // store our settings;
    chrome.storage.sync.set(data, () => {

      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        // console.log(data);
        // chrome.tabs.sendMessage(tabs[ 0 ].id, { from: Sender.POPUP, data } as IMessage);

      });

    });
  }

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

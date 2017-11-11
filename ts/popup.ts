import { IMessage } from "@/base/interface/message";
import { Sender } from "@/base/senders";

(() => {

  const limitElement = document.getElementById("tweet.limit") as HTMLInputElement;

  chrome.storage.sync.get((items) => {

    let { limit = false } = { ...items };

    limitElement.checked = limit;

    // set listener
    limitElement.addEventListener("change", (evt: any) => {

      limit = !!evt.target.checked;

      // store our settings;
      chrome.storage.sync.set({ limit }, () => {

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {

           chrome.tabs.sendMessage(tabs[ 0 ].id, { from: Sender.POPUP, data: { limit } } as IMessage);

        });

      });

    });

  });

})();

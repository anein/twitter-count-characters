import { IMessage } from "@/base/interface/message";
import { Sender } from "@/base/senders";

(() => {

  document.getElementById("tweet.limit").addEventListener("change", (evt: any) => {

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {

      chrome.tabs.sendMessage(tabs[ 0 ].id, { from: Sender.POPUP, data: { limit: (evt.target.checked) } } as IMessage);

    });

  });

})();

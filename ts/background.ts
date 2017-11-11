import { IMessage } from "@/base/interface/message";
import { Sender } from "@/base/senders";

(() => {

  chrome.runtime.onMessage.addListener((message: IMessage, sender, sendResponse) => {

    // if (message.from === Sender.POPUP) {
    //
    //   chrome.runtime.sendMessage({ from: Sender.BACKGROUND, ...message.data });
    //
    // }

  });

})();

import { IMessage } from "@/base/interface/message";
import { Sender } from "@/base/senders";
import { IListener } from "@/content/common/interface/listener";
import { ListenerKind } from "@/content/common/kinds";
import { Limit } from "@/content/common/constants/limits";
import { BaseListener } from "@/content/common/listeners/base.listener";
import { MobileListener } from "@/content/common/listeners/mobile.listener";
import { TweetdeckListener } from "@/content/common/listeners/tweetdeck.listener";
import { WebListener } from "@/content/common/listeners/web.listener";

export class ListenerFactory {

  private queries: any[] = [];

  private factories: IListener[] = [];

  private warnUser: boolean = false;

  constructor() {

    this.setChromeMessageListener();

  }

  public add(query: string, kind: ListenerKind): void {

    this.queries.push({ query, kind });

  }

  public listen(): void {

    for (const element of this.queries) {

      const elemConstructor = this.createFactory(element.kind);
      elemConstructor.maxTweetLength = (this.warnUser) ? Limit.SHORT : Limit.LONG;
      elemConstructor.warnUser = this.warnUser;
      elemConstructor.query = element.query;
      elemConstructor.listen();

      this.factories.push(elemConstructor);

    }

  }

  private createFactory(kind: ListenerKind): IListener {

    switch (kind) {
      case ListenerKind.Web:
        return new WebListener();
      case ListenerKind.Tweetdeck:
        return new TweetdeckListener();
      case ListenerKind.Mobile:
        return new MobileListener();
      default:
        return new BaseListener();
    }
  }

  private setChromeMessageListener(): void {

    chrome.runtime.onMessage.addListener((message: IMessage) => {

      if (message.from === Sender.POPUP) {

        this.warnUser = message.data.limit;

        this.recreateQueries();

      }

    });

  }

  private recreateQueries(): void {
    // stop and remove old listeners
    while (this.factories.length > 0) {
      const factory = this.factories.pop();
      factory.clearTimer();
      factory.clearObserver();
    }
    // recreate
    this.listen();

  }

}

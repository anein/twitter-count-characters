import { IMessage } from "@/base/interface/message";
import { IOptions } from "@/base/interface/options";
import { Sender } from "@/base/senders";
import { Limit } from "@/content/common/constants/limits";
import { IListener } from "@/content/common/interface/listener";
import { ListenerKind } from "@/content/common/kinds";
import { BaseListener } from "@/content/common/listeners/base.listener";
import { MobileListener } from "@/content/common/listeners/mobile.listener";
import { TweetdeckListener } from "@/content/common/listeners/tweetdeck.listener";
import { WebListener } from "@/content/common/listeners/web.listener";

export class ListenerFactory {

  private config: IOptions;

  private queries: any[] = [];

  private factories: IListener[] = [];

  constructor() {

    this.setChromeMessageListener();

  }

  public set options(value: IOptions) {
    this.config = value;
  }

  public get options(): IOptions {
    return this.config;
  }

  /**
   * Add a new query object.
   */
  public add(query: string, kind: ListenerKind): void {

    this.queries.push({ query, kind });

  }

  /**
   * Creates factories based on the query list
   */
  public listen(): void {

    for (const element of this.queries) {

      const elemConstructor = this.createFactory(element.kind);
      elemConstructor.maxTweetLength = (this.config.mode || this.config.limit) ? Limit.SHORT : Limit.LONG;
      elemConstructor.options = this.options;
      elemConstructor.query = element.query;
      elemConstructor.listen();

      this.factories.push(elemConstructor);

    }

  }

  /**
   * Creates an instance of Listener.
   *
   * @param {ListenerKind} kind - type of listener
   * @returns {IListener} - new instance of Listener
   */
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

  /**
   * Sets the chrome listener to accept new settings.
   */
  private setChromeMessageListener(): void {

    chrome.runtime.onMessage.addListener((message: IMessage) => {

      if (message.from === Sender.POPUP) {

        this.config = message.data;

        this.recreateQueries();

      }

    });

  }

  /**
   * Removes previous factories and creates new ones.
   */
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

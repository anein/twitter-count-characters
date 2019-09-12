import { IConfig } from '@/base/interface/config';
import { IMessage } from '@/base/interface/message';
import { Options } from '@/base/model/options';
import { Sender } from '@/base/senders';
import { IListener } from '@/content/common/interface/listener';
import { ListenerKind } from '@/content/common/constants/kinds';
import { TweetdeckListener } from '@/content/common/listeners/tweetdeck.listener';
import { WebListener } from '@/content/common/listeners/web.listener';

export class ListenerFactory {
  private config: IConfig;

  private queries: any[] = [];

  private factories: IListener[] = [];

  constructor() {
    // this.setChromeMessageListener();
  }

  public set options(value: IConfig) {
    this.config = value;
  }

  public get options(): IConfig {
    return this.config;
  }

  /**
   * Add a new query object.
   */
  public add(kind: ListenerKind, element: Node | string): void {
    this.queries.push({ kind, element });
  }

  /**
   * Creates factories based on the query list
   */
  public listen(): void {
    for (const item of this.queries) {
      const elemConstructor = this.createFactory(item.kind);
      elemConstructor.options = new Options(this.options);
      elemConstructor.query = item.element;

      elemConstructor.listen();

      this.factories.push(elemConstructor);
    }
  }

  /**
   * Creates an instance of Listener.
   *
   * @param {ListenerKind} kind - a type of listener
   * @returns {IListener} a new instance of Listener
   */
  private createFactory(kind: ListenerKind): IListener {
    switch (kind) {
      case ListenerKind.Web:
        return new WebListener();
      case ListenerKind.Tweetdeck:
        return new TweetdeckListener();
      default:
        return;
    }
  }

  /**
   * Sets the chrome listener to get accept to the settings.
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

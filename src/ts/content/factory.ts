import { IConfig } from '@base/interface/config';
import { Options } from '@base/model/options';
import { ListenerKind } from '@content/constants/kinds';
import { IListener } from '@content/listeners/base/interface/listener';
import { TweetdeckListener } from '@content/listeners/tweetdeck.listener';
import { WebListener } from '@content/listeners/web.listener';

export class ListenerFactory {
  public config: IConfig;

  private queries: any[] = [];

  private factories: IListener[] = [];

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
      elemConstructor.options = new Options(this.config);
      elemConstructor.query = item.element;

      elemConstructor.listen();

      this.factories.push(elemConstructor);
    }
  }

  /**
   * Removes previous factories and creates new ones.
   */
  public updateOptions(): void {
    for (const factory of this.factories) {
      factory.options = new Options(this.config);
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
}

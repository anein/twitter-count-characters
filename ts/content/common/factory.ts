import { IListener } from "@/content/common/interface/listener.interface";
import { ListenerKind } from "@/content/common/kinds";
import { BaseListener } from "@/content/common/listeners/base.listener";
import { MobileListener } from "@/content/common/listeners/mobile.listener";
import { TweetdeckListener } from "@/content/common/listeners/tweetdeck.listener";
import { WebListener } from "@/content/common/listeners/web.listener";

export class ListenerFactory {

  private queries: any[] = [];

  public add(query: string, kind: ListenerKind): void {

    this.queries.push({ query, kind });

  }

  public listen(): void {

    for (const element of this.queries) {

      const elemConstructor = this.createListener(element.kind);
      elemConstructor.query = element.query;
      elemConstructor.listen();

    }

  }

  private createListener(kind: ListenerKind): IListener {

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

}
